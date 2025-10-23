import prisma from "../../../config/db.js";

export const createProduct = async (data) => {
  const product = await prisma.product.create({
    data: {
      title: data.title,
      description: data.description,
      price: data.price,
      rentPerDay: data.rentPerDay,
      ownerId: data.ownerId,
      categories: {
        create: data.categories.map((categoryName) => ({
          category: { connect: { name: categoryName } },
        })),
      },
    },
    include: {
      categories: {
        include: { category: true },
      },
    },
  });

  return {
    ...product,
    categories: product.categories.map((pc) => pc.category),
  };
};

export const deleteProductById = async (productId) => {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { categories: { include: { category: true } } },
  });

  if (!product) throw new Error("Product not found");

  await prisma.productCategory.deleteMany({ where: { productId } });

  await prisma.product.delete({ where: { id: productId } });

  return {
    ...product,
    categories: product.categories.map((pc) => pc.category),
  };
};




export const getAllProducts = async () => {
  const products = await prisma.product.findMany({
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
  });

  return products.map((product) => ({
    ...product,
    createdAt: product.createdAt?.toISOString(),
    updatedAt: product.updatedAt?.toISOString(),
    categories: product.categories?.map((pc) => pc.category) || [],
  }));
};




export const getAllCategories = () => 
  prisma.category.findMany();

export const getProductById = (id) =>
  prisma.product.findUnique({ where: { id }, include: { categories: true } });
