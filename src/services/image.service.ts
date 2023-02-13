import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createImage(
  uuid: string,
  titulo: string,
  descripcion: string,
  imagePath: string
): Promise<void> {
  await prisma.image.create({
    data: {
      uuid,
      titulo,
      descripcion,
      imagePath,
    },
  });
}

export async function getImage(uuid: string) {
  const data = await prisma.image.findFirst({ where: { uuid } });
  return data;
}
