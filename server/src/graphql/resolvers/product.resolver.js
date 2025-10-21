import { addProduct, getAllProducts, getProductById, getAllCategories } from "../../modules/product/product.service.js";
import { isAuthenticated } from "../../middleware/authContext.js";

export const productResolvers = {
  Query: {
    allProducts: async () => await getAllProducts(),
    productById: async (_, { id }) => await getProductById(id),
    allCategories: async () => await getAllCategories()
  },
  Mutation: {
    addProduct: async (_, { data }, context) => {
      if (context.userId) {
        return await addProduct({ ...data, ownerId: context.userId });
      }
      else{
        throw new Error("Unauthorized. Please login.");
      }
    },
  },
};
