import prisma from "../../../config/db.js";

export const getUserTransactions = async (userId) => {
  const bought = await prisma.product.findMany({
    where: { buyerId: userId },
    include: { 
      owner: true, 
      buyer: true, 
      categories: { include: { category: true } },
      rentals: true,
    },
  });

  const sold = await prisma.product.findMany({
    where: { ownerId: userId, isSold: true },
    include: { 
      owner: true, 
      buyer: true, 
      categories: { include: { category: true } },
      rentals: true,
    },
  });

  const borrowed = await prisma.rental.findMany({
    where: { renterId: userId },
    include: {
      renter: true,
      product: { include: { owner: true, buyer: true, categories: { include: { category: true } }, rentals: true } },
    },
  });

  const lent = await prisma.rental.findMany({
    where: { product: { ownerId: userId } },
    include: {
      renter: true,
      product: { include: { owner: true, buyer: true, categories: { include: { category: true } }, rentals: true } },
    },
  });

  return {
    boughtProducts: bought || [],
    soldProducts: sold || [],
    rentedProducts: borrowed || [],
    lentProducts: lent || [],
  };
};
