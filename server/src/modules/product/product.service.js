import { createProduct, getAllProducts, getProductById, getAllCategories } from "./product.repository.js";

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

export { getAllProducts, getProductById, getAllCategories };  
