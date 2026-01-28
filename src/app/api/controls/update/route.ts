import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { id, status, procedure, automationStatus } = body;

        if (!id) {
            return NextResponse.json({ error: 'Control ID is required' }, { status: 400 });
        }

        const control = await prisma.control.update({
            where: { id },
            data: {
                status,
                procedure,
                automationStatus,
                lastCheck: new Date(),
            },
        });

        // Log the change
        await prisma.agentEvent.create({
            data: {
                type: 'info',
                message: `Control updated: ${control.id}`,
                details: `Status set to ${status}.`,
                timestamp: new Date(),
                controlId: control.id,
            }
        });

        return NextResponse.json(control);
    } catch (error) {
        console.error('API Control Update Error:', error);
        return NextResponse.json({ error: 'Failed to update control' }, { status: 500 });
    }
}
