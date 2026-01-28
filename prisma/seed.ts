import { PrismaClient } from '@prisma/client';
import { requirements, risks, controls, controlActivities, evidence, agentActions, agentEvents } from '../src/data/fixtures';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database...');

    // 1. Requirements
    for (const req of requirements) {
        await prisma.requirement.upsert({
            where: { id: req.id },
            update: {},
            create: {
                id: req.id,
                title: req.title,
                description: req.description,
                source: req.source,
                status: req.status,
                createdAt: new Date(req.createdAt),
                updatedAt: new Date(req.updatedAt),
            },
        });
    }

    // 2. Risks
    for (const risk of risks) {
        await prisma.risk.upsert({
            where: { id: risk.id },
            update: {},
            create: {
                id: risk.id,
                title: risk.title,
                description: risk.description,
                impact: risk.impact,
                likelihood: risk.likelihood,
                status: risk.status,
                createdAt: new Date(risk.createdAt),
                updatedAt: new Date(risk.updatedAt),
                requirements: {
                    connect: risk.linkedRequirementIds.map(id => ({ id })),
                },
            },
        });
    }

    // 3. Controls
    for (const ctrl of controls) {
        await prisma.control.upsert({
            where: { id: ctrl.id },
            update: {},
            create: {
                id: ctrl.id,
                title: ctrl.title,
                description: ctrl.description,
                procedure: ctrl.procedure,
                status: ctrl.status,
                automationStatus: ctrl.automationStatus,
                lastCheck: ctrl.lastCheck ? new Date(ctrl.lastCheck) : null,
                confidenceScore: ctrl.confidenceScore,
                createdAt: new Date(ctrl.createdAt),
                updatedAt: new Date(ctrl.updatedAt),
                risks: {
                    connect: ctrl.linkedRiskIds.map(id => ({ id })),
                },
            },
        });
    }

    // 4. Evidence
    for (const ev of evidence) {
        await prisma.evidence.create({
            data: {
                id: ev.id,
                title: ev.title,
                fileName: ev.fileName,
                uploadedAt: new Date(ev.uploadedAt),
                status: ev.status,
                linkedControlId: ev.linkedControlId,
                assignedTo: ev.assignedTo,
                matchScore: ev.matchScore,
            },
        });
    }

    // 5. Agent Actions & Events
    for (const action of agentActions) {
        await prisma.agentAction.create({
            data: {
                id: action.id,
                controlId: action.controlId,
                type: action.type,
                title: action.title,
                description: action.description,
                reasoning: action.reasoning,
                status: action.status,
                timestamp: new Date(action.timestamp),
            },
        });
    }

    for (const event of agentEvents) {
        await prisma.agentEvent.create({
            data: {
                id: event.id,
                controlId: event.controlId,
                type: event.type,
                message: event.message,
                timestamp: new Date(event.timestamp),
                details: event.details,
            },
        });
    }

    console.log('Seeding complete.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
