import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { userTypeDef } from "./typeDefs/user.type.js";
import { userResolvers } from "./resolvers/user.resolver.js";

export const typeDefs = mergeTypeDefs([userTypeDef]);
export const resolvers = mergeResolvers([userResolvers]);
