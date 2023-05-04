import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
    await prisma.user.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            name: "alice",
            email: "alice@email.com",
            password: "asd123",
            role: "admin",
        },
    });
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
