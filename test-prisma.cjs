const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
    try {
        const reqs = await prisma.requirement.findMany();
        console.log('Requirements:', reqs.length);
    } catch (e) {
        console.error('Error during findMany:', e);
    }
}
main().catch(console.error).finally(async () => await prisma.$disconnect());
