import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const events = await prisma.agentEvent.findMany({
            orderBy: { timestamp: 'desc' },
            take: 20,
            include: {
                control: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
            },
        });

        // Transform to match the ActivityItem expected by the UI
        const activity = events.map((event) => {
            let agentName = 'System Agent';
            const cid = event.controlId || '';
            if (cid.includes('ACC')) agentName = 'Access Agent';
            else if (cid.startsWith('PRIV')) agentName = 'Privacy Agent';
            else if (cid.includes('SOC') || cid.startsWith('CTL-00')) agentName = 'Security Agent';
            else if (cid.startsWith('CTL-CM')) agentName = 'Policy Agent';

            return {
                id: event.id,
                agentName,
                action: event.type === 'action' ? event.message.split(' ')[0] + ' ' + (event.message.split(' ')[1] || '') : event.message,
                target: event.details || event.control?.title || 'System',
                timestamp: event.timestamp.toISOString(),
                status: event.type === 'alert' ? 'failed' : 'success',
                controlId: event.controlId,
            };
        });

        return NextResponse.json(activity);
    } catch (error) {
        console.error('API Agent Activity Error:', error);
        return NextResponse.json({ error: 'Failed to fetch agent activity' }, { status: 500 });
    }
}
