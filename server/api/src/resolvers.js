/** @format */
import { User } from "./models";
import nanoid from "nanoid";

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
        password: input.password,
        email: input.email,
        age: input.age,
        posts: input.posts,
        avatar: input.avatar,
        images: input.images,
        comments: input.comments,
        followers: input.followers,
        following: input.following,
      });
      return user.save();
    },
  },
};

module.exports = resolvers;
