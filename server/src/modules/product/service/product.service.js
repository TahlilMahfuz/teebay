import { createProduct, getAllProducts, getProductById, getAllCategories, deleteProductById, updateViewCount } from "../repository/product.repository.js";

export const addProduct = async (data) => {
  if (!data.categories || !Array.isArray(data.categories) || data.categories.length === 0) {
    throw new Error("Product must have at least one category");
  }

  let categories = await getAllCategories();

  const invalidCategories = data.categories.filter(
    (c) => !categories.some((cat) => cat.name.toLowerCase() === c.toLowerCase())
  );

  if (invalidCategories.length > 0) {
    throw new Error(`Invalid categories: ${invalidCategories.join(", ")}`);
  }

  const product = await createProduct(data);
  return product;
};


export const removeProduct = async (productId, userId) => {
  const product = await getProductById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  if (product.ownerId !== userId) {
    throw new Error("Unauthorized: You are not the owner of this product");
  }

  const deletedProduct = await deleteProductById(productId);
  return deletedProduct;
};

export const updateViewCountById = async (id) => {
  const product = await getProductById(id);
  if (!product) throw new Error("Product not found");
  const productWithUpdatedViewCount = await updateViewCount(id);
  return productWithUpdatedViewCount;
};



export { getAllProducts, getProductById, getAllCategories};