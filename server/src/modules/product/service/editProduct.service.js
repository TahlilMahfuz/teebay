import { editProductRepo } from "../repository/editProduct.respository.js";

export const editProduct = async (productId, ownerId, data) => {
  return await editProductRepo(productId, ownerId, data);
};
