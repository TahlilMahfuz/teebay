import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { userTypeDef } from "./typeDefs/user.type.js";
import { userResolvers } from "./resolvers/user.resolver.js";
import { productTypeDef } from "./typeDefs/product.type.js";
import { productResolvers } from "./resolvers/product.resolver.js";

export const typeDefs = mergeTypeDefs([userTypeDef, productTypeDef]);
export const resolvers = mergeResolvers([userResolvers, productResolvers]);