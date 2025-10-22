import prisma from "../../../config/db.js";

export const getUserTransactions = async (userId) => {
  const bought = await prisma.product.findMany({
    where: { buyerId: userId },
    include: { owner: true, categories: { include: { category: true } } },
  });

  const sold = await prisma.product.findMany({
    where: { ownerId: userId, isSold: true },
    include: { buyer: true, categories: { include: { category: true } } },
  });

  const borrowed = await prisma.rental.findMany({
    where: { renterId: userId },
    include: {
      product: { include: { owner: true, categories: { include: { category: true } } } },
    },
  });

  const lent = await prisma.rental.findMany({
    where: { product: { ownerId: userId } },
    include: {
      product: { include: { renter: true, categories: { include: { category: true } } } },
    },
  });

  return { bought, sold, borrowed, lent };
};