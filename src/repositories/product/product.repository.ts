import { prisma } from "../../database/db";

export default class ProductRepository {
  static async findAll() {
    return await prisma.product.findMany({
      include: { categories: true, images: true },
    });
  }

  static async findByCategory(category: string | Array<string>) {
    return await prisma.category.findMany({
      where: { name: { in: category } },
      include: {
        products: { include: { categories: true, images: true } },
      },
    });
  }

  static async create({
    name,
    price,
    description,
    inventory,
    categories,
    images,
  }: {
    name: string;
    price: number;
    description: string;
    inventory: number;
    categories?: Array<string>;
    images?: Array<string>;
  }) {
    return await prisma.product.create({
      data: {
        name,
        price,
        description,
        inventory,
        categories: {
          connectOrCreate: categories?.map((category) => {
            return {
              where: { name: category },
              create: { name: category },
            };
          }),
        },
        images: {
          create: images?.map((image) => {
            return { link: image };
          }),
        },
      },
    });
  }

  static async update({
    id,
    name,
    price,
    description,
    inventory,
    categories,
    images,
  }: {
    id: number;
    name?: string;
    price?: number;
    description?: string;
    inventory?: number;
    categories?: Array<string>;
    images?: Array<string>;
  }) {
    return await prisma.product.update({
      where: { id },
      data: {
        name,
        price,
        description,
        inventory,
        categories: {
          connectOrCreate: categories?.map((category) => {
            return {
              where: { name: category },
              create: { name: category },
            };
          }),
        },
        images: {
          create: images?.map((image) => {
            return { link: image };
          }),
        },
      },
    });
  }

  static async delete(id: number) {
    const deleteImages = prisma.productImage.deleteMany({
      where: { productId: id },
    });
    const deleteProduct = prisma.product.delete({ where: { id } });
    await prisma.$transaction([deleteImages, deleteProduct]);
  }

  static async newImage(productId: number, imagesPaths: string[]) {
    return await prisma.productImage.createMany({
      data: imagesPaths.map((image) => {
        return { link: image, productId };
      }),
    });
  }

  static async deleteImage(id: number) {
    return await prisma.productImage.delete({
      where: { id },
    });
  }
}
