import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const requirements = await prisma.requirement.findMany({
            include: {
                risks: { select: { id: true } },
            },
        });

        const transformedRequirements = requirements.map((req) => ({
            ...req,
            linkedRiskIds: req.risks.map((r) => r.id),
            createdAt: req.createdAt.toISOString().split('T')[0],
            updatedAt: req.updatedAt.toISOString().split('T')[0],
        }));

        return NextResponse.json(transformedRequirements);
    } catch (error) {
        console.error('API Requirements Error:', error);
        return NextResponse.json({ error: 'Failed to fetch requirements' }, { status: 500 });
    }
}
