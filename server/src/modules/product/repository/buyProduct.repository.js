import prisma from "../../../config/db.js";


export const buyProduct = async (productId, buyerId) => {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      owner: true,
      buyer: true,
      categories: { include: { category: true } },
      rentals: true,
    },
  });

  if (!product) throw new Error("Product not found");
  if (product.isSold) throw new Error("Product already sold");
  if (product.ownerId === buyerId)
    throw new Error("You cannot buy your own product");

  const updatedProduct = await prisma.product.update({
    where: { id: productId },
    data: {
      isSold: true,
      buyerId,
    },
    include: {
      owner: true,
      buyer: true,
      categories: { include: { category: true } },
      rentals: true, // include rentals
    },
  });

  // flatten categories array
  return {
    ...updatedProduct,
    categories: updatedProduct.categories.map((pc) => pc.category),
  };
};
