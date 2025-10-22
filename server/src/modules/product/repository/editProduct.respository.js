import prisma from "../../../config/db.js";

export const editProductRepo = async (productId, ownerId, data) => {
  const { title, description, price, rentPerDay, categories } = data;

  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { categories: true },
  });

  if (!product) throw new Error("Product not found");

  if (product.ownerId !== ownerId)
    throw new Error("You can only edit your own products");

  if (product.isSold) throw new Error("Cannot edit a sold product");
  await prisma.product.update({
    where: { id: productId },
    data: { title, description, price, rentPerDay },
  });

  if (categories && categories.length > 0) {
    await prisma.productCategory.deleteMany({ where: { productId } });

    const categoryRecords = await prisma.category.findMany({
      where: { name: { in: categories } },
    });

    const productCategoryData = categoryRecords.map((c) => ({
      productId,
      categoryId: c.id,
    }));

    await prisma.productCategory.createMany({ data: productCategoryData });
  }

  const updatedProduct = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      owner: true,
      buyer: true,
      rentals: true,
      categories: { include: { category: true } },
    },
  });

  return {
    ...updatedProduct,
    categories: updatedProduct.categories.map((pc) => pc.category),
  };
};
