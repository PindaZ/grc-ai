import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const activities = await prisma.controlActivity.findMany({
            include: {
                control: { select: { title: true } },
            },
        });

        const transformed = activities.map(a => ({
            ...a,
            dueDate: a.dueDate.toISOString().split('T')[0],
            controlTitle: a.control.title,
        }));

        return NextResponse.json(transformed);
    } catch (error) {
        console.error('API Activities Error:', error);
        return NextResponse.json({ error: 'Failed to fetch activities' }, { status: 500 });
    }
}
