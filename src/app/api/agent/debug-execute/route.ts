import { NextResponse } from 'next/server';
import { AgentRunner } from '@/lib/agent/runner';

export async function POST(request: Request) {
    try {
        const { agentId, prompt } = await request.json();

        if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
            return NextResponse.json({
                error: 'Missing Google API Key. (Local: Add GOOGLE_GENERATIVE_AI_API_KEY to .env | Prod: Add to Dokploy Env Vars)'
            }, { status: 400 });
        }

        const runner = new AgentRunner(agentId || 'debug-agent');
        const result = await runner.execute(prompt);

        return NextResponse.json(result);
    } catch (error: any) {
        console.error('Debug Agent Execute Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
