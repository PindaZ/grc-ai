
import { NextResponse } from 'next/server';
import { FileSystemSkillLoader } from '@/lib/agent/skill-loader';

export async function POST(request: Request) {
    try {
        // 1. Initialize Loader
        const loader = new FileSystemSkillLoader();

        // 2. Load Skills (Level 1: Discovery)
        const skills = await loader.loadSkills();

        // 3. Construct the "System Prompt" part (Simulation)
        const systemPromptSkillsInjection = skills.map(s =>
            `Tool: ${s.name}\nDescription: ${s.description}`
        ).join('\n\n');

        // 4. Handle Mock Request
        const body = await request.json();
        const userMessage = body.messages?.[0]?.content || "No message provided";

        // 5. Simulate Agent Decision Logic (Mock)
        let agentResponse = "";
        let triggeredSkill = null;

        if (userMessage.toLowerCase().includes("compliance") && skills.some(s => s.name === 'compliance-checker')) {
            triggeredSkill = skills.find(s => s.name === 'compliance-checker');
        }
        else if ((userMessage.toLowerCase().includes("audit") || userMessage.toLowerCase().includes("soc 2")) && skills.some(s => s.name === 'audit-report-analyzer')) {
            triggeredSkill = skills.find(s => s.name === 'audit-report-analyzer');
        }
        else if ((userMessage.toLowerCase().includes("access") || userMessage.toLowerCase().includes("terminated")) && skills.some(s => s.name === 'access-reviewer')) {
            triggeredSkill = skills.find(s => s.name === 'access-reviewer');
        }
        else if ((userMessage.toLowerCase().includes("policy") || userMessage.toLowerCase().includes("pull request")) && skills.some(s => s.name === 'policy-enforcer')) {
            triggeredSkill = skills.find(s => s.name === 'policy-enforcer');
        }
        else if ((userMessage.toLowerCase().includes("privacy") || userMessage.toLowerCase().includes("gdpr")) && skills.some(s => s.name === 'privacy-manager')) {
            triggeredSkill = skills.find(s => s.name === 'privacy-manager');
        }
        else if (userMessage.toLowerCase().includes("event") && skills.some(s => s.name === 'event-listener')) {
            triggeredSkill = skills.find(s => s.name === 'event-listener');
        }
        else if (userMessage.toLowerCase().includes("provision") && skills.some(s => s.name === 'provisioner')) {
            triggeredSkill = skills.find(s => s.name === 'provisioner');
        }
        else if (userMessage.toLowerCase().includes("evidence") && skills.some(s => s.name === 'evidence-logger')) {
            triggeredSkill = skills.find(s => s.name === 'evidence-logger');
        }
        else if (userMessage.toLowerCase().includes("match") && skills.some(s => s.name === 'identity-mapper')) {
            triggeredSkill = skills.find(s => s.name === 'identity-mapper');
        }
        else if (userMessage.toLowerCase().includes("message") && skills.some(s => s.name === 'communicator')) {
            triggeredSkill = skills.find(s => s.name === 'communicator');
        }
        else if (userMessage.toLowerCase().includes("parse") && skills.some(s => s.name === 'doc-parser')) {
            triggeredSkill = skills.find(s => s.name === 'doc-parser');
        }

        if (triggeredSkill) {
            agentResponse = `[MOCK AGENT] I understand your request. 
        
        TRIGGERING SKILL: ${triggeredSkill.name}
        LOADING INSTRUCTIONS FROM: ${triggeredSkill.path}
        
        --- SKILL CONTENT (Level 2) ---
        ${triggeredSkill.instructions.substring(0, 200)}... (truncated)
        -------------------------------
        
        Analysis complete based on skill instructions.`;
        } else {
            agentResponse = `[MOCK AGENT] I am ready. I have loaded ${skills.length} skills. Ask me about compliance, audits, access reviews, policies, or privacy to test a skill.`;
        }

        return NextResponse.json({
            status: "success",
            loaded_skills_count: skills.length,
            available_skills: skills.map(s => s.name),
            skills_dir_path: (loader as any).skillsDir,
            cwd: process.cwd(),
            mock_agent_response: agentResponse,
            system_prompt_injection_preview: systemPromptSkillsInjection
        });

    } catch (error) {
        console.error("Agent Error:", error);
        return NextResponse.json({ error: "Internal Server Error", details: String(error) }, { status: 500 });
    }
}
