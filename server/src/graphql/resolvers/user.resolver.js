import { registerUser, loginUser } from "../../modules/user/user.service.js";

export const userResolvers = {
  Query: {
    hello: () => "Hello from Teebay JS server!",
  },
  Mutation: {
    registerUser: async (_, { data }) => {
      try {
        return await registerUser(data);
      } catch (err) {
        throw new Error(err.message);
      }
    },
    loginUser: async (_, { data }) => {
      try {
        return await loginUser(data.email, data.password);
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
};
