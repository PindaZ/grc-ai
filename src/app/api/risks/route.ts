import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const risks = await prisma.risk.findMany({
            include: {
                requirements: { select: { id: true } },
                controls: { select: { id: true } },
            },
        });

        const transformedRisks = risks.map((risk) => ({
            ...risk,
            linkedRequirementIds: risk.requirements.map((r) => r.id),
            linkedControlIds: risk.controls.map((c) => c.id),
            createdAt: risk.createdAt.toISOString().split('T')[0],
            updatedAt: risk.updatedAt.toISOString().split('T')[0],
        }));

        return NextResponse.json(transformedRisks);
    } catch (error) {
        console.error('API Risks Error:', error);
        return NextResponse.json({ error: 'Failed to fetch risks' }, { status: 500 });
    }
}
