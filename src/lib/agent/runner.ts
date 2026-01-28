import { google } from '@ai-sdk/google';
import { generateText, tool } from 'ai';
import { prisma } from '@/lib/db';
import { z } from 'zod';
import { FileSystemSkillLoader } from './skill-loader';

export class AgentRunner {
    private agentId: string;
    private skillLoader: FileSystemSkillLoader;

    constructor(agentId: string) {
        this.agentId = agentId;
        this.skillLoader = new FileSystemSkillLoader();
    }

    async execute(task: string) {
        try {
            // Load available skills to inform the agent
            const skills = await this.skillLoader.loadSkills();
            const skillContext = skills.map(s => `- ${s.name}: ${s.description}`).join('\n');

            // Log started execution
            // Log started execution - using raw SQL to bypass stale Prisma client locks
            try {
                await prisma.$executeRawUnsafe(
                    `INSERT INTO AgentEvent (id, type, message, timestamp) VALUES (?, ?, ?, ?)`,
                    Math.random().toString(36).substring(7),
                    'action',
                    `Agent ${this.agentId} starting task: ${task}`,
                    new Date().toISOString()
                );
            } catch (e) {
                console.warn('Fallback logging failed:', e);
            }

            const systemPrompt = `You are a professional GRC (Governance, Risk, and Compliance) Agent.
Your ID is ${this.agentId}.
You have access to the following domain-specific skills:
${skillContext}

When a user asks you to perform a task, use the available tools to fetch data and log your actions.
Always assume a tone of professional compliance oversight.`;

            // Use aggressive any casting for the entire text generation call to bypass SDK type mismatches
            const tools: any = {
                getControlDetails: tool({
                    description: 'Get the full details of a specific compliance control by its ID.',
                    parameters: z.object({
                        controlId: z.string().describe('The ID of the control to fetch.'),
                    }),
                    execute: async ({ controlId }: { controlId: string }) => {
                        const control = await prisma.control.findUnique({ where: { id: controlId } });
                        return control || { error: 'Control not found' };
                    },
                }),
                listRisks: tool({
                    description: 'List all risks in the risk register.',
                    parameters: z.object({}),
                    execute: async () => {
                        return await prisma.risk.findMany() || [];
                    },
                }),
                createEvent: tool({
                    description: 'Create an event entry in the neural activity feed.',
                    parameters: z.object({
                        controlId: z.string().optional(),
                        message: z.string(),
                        type: z.enum(['action', 'alert', 'info']),
                        details: z.string().optional(),
                    }),
                    execute: async ({ controlId, message, type, details }: any) => {
                        try {
                            return await prisma.agentEvent.create({
                                data: { controlId, message, type, details, timestamp: new Date() } as any
                            });
                        } catch (e) {
                            return await prisma.$executeRawUnsafe(
                                `INSERT INTO AgentEvent (id, controlId, type, message, timestamp, details) VALUES (?, ?, ?, ?, ?, ?)`,
                                Math.random().toString(36).substring(7),
                                controlId || null,
                                type,
                                message,
                                new Date().toISOString(),
                                details || null
                            );
                        }
                    },
                }),
                updateRiskStatus: tool({
                    description: 'Update the status of a risk (open, mitigated, accepted, closed).',
                    parameters: z.object({
                        riskId: z.string(),
                        status: z.string(),
                    }),
                    execute: async ({ riskId, status }: { riskId: string; status: string }) => {
                        return await prisma.risk.update({
                            where: { id: riskId },
                            data: { status }
                        });
                    }
                })
            };

            const result = await (generateText as any)({
                model: google('gemini-3-flash-preview'),
                system: systemPrompt,
                prompt: task,
                tools,
                maxSteps: 5,
            });

            return result;
        } catch (error: any) {
            console.error('Agent Runner Error:', error);
            // Better error reporting for the UI
            if (error.message?.includes('quota')) {
                throw new Error('API Quota Exceeded. Please try again in 1 minute.');
            }
            if (error.message?.includes('not found')) {
                throw new Error('Model configuration error. Please check your Gemini API key permissions.');
            }
            throw error;
        }
    }
}
