import { editProductRepo } from "../repository/editProduct.respository.js";

export const editProduct = async (productId, ownerId, data) => {
  try {
    return await editProductRepo(productId, ownerId, data);
  } catch (err) {
    throw new Error(err.message);
  }
};
