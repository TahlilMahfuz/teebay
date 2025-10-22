import { rentProduct } from "../repository/rentProduct.repository.js"

export const rentAProduct = async (productId, renterId, startDate, endDate) => {
  if (!productId || !renterId || !startDate || !endDate)
    throw new Error("Missing rental data");

  if (new Date(startDate) >= new Date(endDate))
    throw new Error("Invalid rental period");

  const rental = await rentProduct(productId, renterId, startDate, endDate);
  return rental;
};