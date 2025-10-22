import { buyProduct } from "../repository/buyProduct.repository.js";
import { getProductById } from "../repository/product.repository.js";

export const purchaseProduct = async (productId, buyerId) => {
  if (!productId || !buyerId) throw new Error("Invalid request data");

  const product = await getProductById(productId);
  if (!product) throw new Error("Product not found");
  if (product.isSold) throw new Error("Product is already sold");
  if (product.ownerId === buyerId) throw new Error("You cannot buy your own product");

  const updatedProduct = await buyProduct(productId, buyerId);
  return updatedProduct;
};