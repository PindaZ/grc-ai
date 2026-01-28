import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, description, impact, likelihood, status } = body;

        if (!title) {
            return NextResponse.json({ error: 'Title is required' }, { status: 400 });
        }

        const risk = await prisma.risk.create({
            data: {
                id: `RSK-${Math.floor(1000 + Math.random() * 9000)}`,
                title,
                description: description || '',
                impact: impact || 3,
                likelihood: likelihood || 3,
                status: status || 'open',
            },
        });

        // Log the creation
        await prisma.agentEvent.create({
            data: {
                type: 'info',
                message: `New risk created: ${risk.id}`,
                details: `Risk "${title}" was manually added to the register.`,
                timestamp: new Date(),
                controlId: 'SYSTEM',
            }
        });

        return NextResponse.json(risk);
    } catch (error) {
        console.error('API Risk Create Error:', error);
        return NextResponse.json({ error: 'Failed to create risk' }, { status: 500 });
    }
}
