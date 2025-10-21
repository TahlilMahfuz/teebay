import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs, resolvers } from "./graphql/schema.js";
import { isAuthenticated } from "./middleware/authContext.js";

const PORT = process.env.PORT || 4000;

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: PORT },
  context: async ({ req }) => {
    const { userId, user } = await isAuthenticated({ req });
    return { userId, user };
  },
});

console.log(`🚀 Server ready at: ${url}`);
