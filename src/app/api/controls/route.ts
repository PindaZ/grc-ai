import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const controls = await prisma.control.findMany({
            include: {
                risks: { select: { id: true } },
                evidence: { select: { id: true } },
            },
        });

        // Transform to match the frontend Control interface
        const transformedControls = controls.map((ctrl) => ({
            ...ctrl,
            linkedRiskIds: ctrl.risks.map((r) => r.id),
            linkedEvidenceIds: ctrl.evidence.map((e) => e.id),
            // Prisma DateTime to ISO String
            createdAt: ctrl.createdAt.toISOString().split('T')[0],
            updatedAt: ctrl.updatedAt.toISOString().split('T')[0],
            lastCheck: ctrl.lastCheck?.toISOString(),
        }));

        return NextResponse.json(transformedControls);
    } catch (error) {
        console.error('API Controls Error:', error);
        return NextResponse.json({ error: 'Failed to fetch controls' }, { status: 500 });
    }
}
