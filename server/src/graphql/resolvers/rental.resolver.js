import { rentAProduct } from "../../modules/product/service/rentProduct.sevice.js";
import { getUserActivity } from "../../modules/product/service/transactProduct.service.js";

export const rentalResolvers = {
  Query: {
    getUserActivity: async (_, __, context) => {
      if (context.userId) {
        return await getUserActivity(context.userId);
      } else {
        throw new Error("Unauthorized. Please login.");
      }
    },
  },
  Mutation: {
    rentProduct: async (_, { data }, context) => {
      if (!context.userId) throw new Error("Unauthorized. Please login.");

      const { productId, startDate, endDate } = data || {};
      if (!productId || !startDate || !endDate) {
        throw new Error("Missing rental data (productId, startDate, endDate) are required.");
      }
      return await rentAProduct(productId, context.userId, startDate, endDate);
    }
  },
};
