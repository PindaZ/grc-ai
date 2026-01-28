import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const [controlsCount, risksCount, requirementsCount, actionsToday] = await Promise.all([
            prisma.control.count(),
            prisma.risk.count(),
            prisma.requirement.count(),
            prisma.agentEvent.count({
                where: {
                    timestamp: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
                }
            })
        ]);

        return NextResponse.json({
            controls: controlsCount,
            risks: risksCount,
            requirements: requirementsCount,
            actions24h: actionsToday,
            systemHealth: 98,
            agentsActive: 4,
            pendingReview: 12
        });
    } catch (error) {
        console.error('API Stats Error:', error);
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
    }
}
