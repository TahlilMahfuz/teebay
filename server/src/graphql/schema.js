import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { userTypeDef } from "./typeDefs/user.type.js";
import { userResolvers } from "./resolvers/user.resolver.js";
import { productTypeDef } from "./typeDefs/product.type.js";
import { productResolvers} from "./resolvers/product.resolver.js";
import { rentalTypeDef } from "./typeDefs/rental.type.js";
import { rentalResolvers } from "./resolvers/rental.resolver.js";


export const typeDefs = mergeTypeDefs([userTypeDef, productTypeDef, rentalTypeDef]);
export const resolvers = mergeResolvers([userResolvers, productResolvers, rentalResolvers]);