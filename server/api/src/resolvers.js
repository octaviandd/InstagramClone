/** @format */
import { User } from "./models";

const resolvers = {
  Query: {
    getUsers: async (_, { name }, ctx, info) =>
      await User.find({ name }).exec(),
  },

  Mutation: {
    NewUser(_, { name }, ctx, info) {
      const user = new User({ name });
      return user.save();
    },
  },
};

module.exports = resolvers;
