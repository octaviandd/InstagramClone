/** @format */
import { User } from "./models";

const resolvers = {
  Query: {
    getUsers: async (_, __, ctx, info) => {
      const users = await User.find({}).exec();
      return users;
    },
  },

  Mutation: {
    newUser: (_, { input }, ctx, info) => {
      const user = new User({
        id: input.id,
        name: input.name,
        email: input.email,
        age: input.age,
        posts: input.posts,
        comments: input.comments,
        friends: input.friends,
        img: input.img,
      });
      return user.save();
    },
  },
};

module.exports = resolvers;
