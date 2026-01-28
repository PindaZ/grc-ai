import { OSCALCatalog, OSCALControl, OSCALGroup } from '@/types/oscal';
import { Control } from '@/types';
import { prisma } from '@/lib/db';

export class OSCALImporter {
    async persist(controls: Control[]): Promise<void> {
        for (const control of controls) {
            await prisma.control.upsert({
                where: { id: control.id },
                update: {
                    title: control.title,
                    description: control.description,
                    procedure: control.procedure,
                },
                create: {
                    id: control.id,
                    title: control.title,
                    description: control.description,
                    procedure: control.procedure,
                    status: control.status as any,
                    automationStatus: control.automationStatus,
                    createdAt: new Date(control.createdAt),
                    updatedAt: new Date(control.updatedAt),
                },
            });
        }
    }
    async fetchCatalog(url: string): Promise<OSCALCatalog> {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch catalog from ${url}`);
        }
        return response.json();
    }

    transform(catalog: OSCALCatalog): Control[] {
        const internalControls: Control[] = [];

        const processGroup = (group: OSCALGroup) => {
            if (group.controls) {
                group.controls.forEach(control => {
                    internalControls.push(this.mapControl(control, group.title));
                });
            }
            if (group.groups) {
                group.groups.forEach(processGroup);
            }
        };

        if (catalog.catalog.groups) {
            catalog.catalog.groups.forEach(processGroup);
        }

        if (catalog.catalog.controls) {
            catalog.catalog.controls.forEach(control => {
                internalControls.push(this.mapControl(control, 'General'));
            });
        }

        return internalControls;
    }

    private mapControl(control: OSCALControl, category: string): Control {
        const description = (control.parts || [])
            .filter(part => part.name === 'guidance' || part.name === 'description')
            .map(part => this.flattenProse(part))
            .join('\n\n');

        const procedure = (control.parts || [])
            .filter(part => part.name === 'statement')
            .map(part => this.flattenProse(part))
            .join('\n\n');

        return {
            id: control.id.toUpperCase(),
            title: control.title,
            description: description || 'No description provided.',
            procedure: procedure || 'Manual review required.',
            status: 'active',
            automationStatus: 'manual',
            linkedRiskIds: [],
            linkedEvidenceIds: [],
            createdAt: new Date().toISOString().split('T')[0],
            updatedAt: new Date().toISOString().split('T')[0]
        };
    }

    private flattenProse(part: any): string {
        let prose = part.prose || '';
        if (part.parts) {
            part.parts.forEach((subPart: any) => {
                const subProse = this.flattenProse(subPart);
                if (subProse) {
                    prose += `\n- ${subProse}`;
                }
            });
        }
        return prose.trim();
    }
}
