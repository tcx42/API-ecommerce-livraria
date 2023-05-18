import { PrismaClient } from "@prisma/client";
import Encryption from "../core/utils/encryption";
const prisma = new PrismaClient();
async function main() {
  await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: "alice",
      email: "alice@email.com",
      password: Encryption.hashPassword("asdf1234"),
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
  });
