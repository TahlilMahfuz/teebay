import prisma from "../../../config/db.js";


export const buyProduct = async (productId, buyerId) => {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { categories: { include: { category: true } } },
  });
  if (!product) throw new Error("Product not found");
  if (product.isSold) throw new Error("Product already sold");
  if (product.ownerId === buyerId)
    throw new Error("You cannot buy your own product");

  await prisma.product.update({
    where: { id: productId },
    data: {
      isSold: true,
      buyerId,
    },
    include: {
      owner: true,
      buyer: true,
      categories: { include: { category: true } }, 
    },
  });
  return {
    ...product,
    categories: product.categories.map((pc) => pc.category),
  };
};