import prisma from "../../../config/db.js";

export const rentProduct = async (productId, renterId, startDate, endDate) => {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { rentals: true },
  });

  if (!product) throw new Error("Product not found");
  if (product.ownerId === renterId)
    throw new Error("You cannot rent your own product");

  const overlap = product.rentals.some(
    (r) =>
      (new Date(startDate) <= new Date(r.endDate)) &&
      (new Date(endDate) >= new Date(r.startDate))
  );

  if (overlap) throw new Error("Product is already rented during this period");

  return await prisma.rental.create({
    data: {
      productId,
      renterId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    },
    include: {
      product: { include: { owner: true, categories: { include: { category: true } } } },
      renter: true,
    },
  });
};
