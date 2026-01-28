import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    const reqs = await prisma.requirement.findMany();
    console.log('Requirements:', reqs.length);
}
main().catch(console.error).finally(async () => await prisma.$disconnect());
