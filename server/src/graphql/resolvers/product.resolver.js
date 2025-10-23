import { addProduct, getAllProducts, getProductById, getAllCategories, removeProduct} from "../../modules/product/service/product.service.js";
import { editProduct } from "../../modules/product/service/editProduct.service.js";
import { purchaseProduct } from "../../modules/product/service/buyProduct.service.js";
import { updateViewCountById } from "../../modules/product/service/product.service.js";

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
    },
    editProduct: async (_, { productId, data }, { user }) => {
      if (!user) throw new Error("Authentication required");

      return await editProduct(productId, user.id, data);
    },
    updateViewCount: async (_, { id }) => {
      return await updateViewCountById(id);
    }
  },
};
