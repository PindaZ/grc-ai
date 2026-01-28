import { NextResponse } from 'next/server';
import { OSCALImporter } from '@/lib/oscal/importer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { controls } = body;

        if (!controls || !Array.isArray(controls)) {
            return NextResponse.json({ error: 'Invalid controls data' }, { status: 400 });
        }

        const importer = new OSCALImporter();
        await importer.persist(controls);

        return NextResponse.json({
            success: true,
            message: `Successfully persisted ${controls.length} controls to the database.`
        });
    } catch (error) {
        console.error('OSCAL Persist Error:', error);
        return NextResponse.json({ error: 'Internal Server Error', details: String(error) }, { status: 500 });
    }
}
