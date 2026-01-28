import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { id, status, impact, likelihood } = body;

        if (!id) {
            return NextResponse.json({ error: 'Risk ID is required' }, { status: 400 });
        }

        const risk = await prisma.risk.update({
            where: { id },
            data: {
                status,
                impact,
                likelihood,
            },
        });

        // Log the change
        await prisma.agentEvent.create({
            data: {
                type: 'info',
                message: `Risk updated: ${risk.id}`,
                details: `Status set to ${status}.`,
                timestamp: new Date(),
                controlId: 'SYSTEM',
            }
        });

        return NextResponse.json(risk);
    } catch (error) {
        console.error('API Risk Update Error:', error);
        return NextResponse.json({ error: 'Failed to update risk' }, { status: 500 });
    }
}
