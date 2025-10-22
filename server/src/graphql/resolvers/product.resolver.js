import { addProduct, getAllProducts, getProductById, getAllCategories, removeProduct} from "../../modules/product/service/product.service.js";
import { purchaseProduct } from "../../modules/product/service/buyProduct.service.js";
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
    deleteProduct: async (_, { id }, context) => {
      if (context.userId) {
        return await removeProduct(id, context.userId);
      }
      else{
        throw new Error("Unauthorized. Please login.");
      }
    },
    purchaseProduct: async (_, { productId }, context) => {
      if (context.userId) {
        return await purchaseProduct(productId, context.userId);
      } else {
        throw new Error("Unauthorized. Please login.");
      }
    }
  },
};
