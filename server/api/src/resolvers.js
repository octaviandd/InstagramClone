/** @format */
import { nanoid } from "nanoid";
import { authenticated } from "./auth";

const resolvers = {
  Query: {
    getMe: authenticated((_, __, { user }) => {
      return user;
    }),
    getUsers: async (_, __, { models }) => {
      const users = await models.User.find({}).exec();
      return users;
    },
  },

  Mutation: {
    createUser: async (_, { input }, { models, createToken }) => {
      const existing = await models.User.findOne({ email: input.email });
      console.log(existing);
      if (existing) {
        throw new Error("User already exists.");
      }
      const user = new models.User({
        _id: nanoid(),
        name: input.name,
        password: input.password,
        email: input.email,
        createdAt: Date.now(),
        posts: [],
        images: [],
        comments: [],
        followers: [],
        following: [],
      });
      const token = createToken(user);
      user.save();
      return { user, token };
    },
    loginUser: async (_, { input }, { models, createToken }) => {
      const user = await models.User.findOne({ email: input.email });
      if (!user) {
        throw new Error("Invalid Credentials");
      }
      const token = createToken(user);
      return { user, token };
    },
    createPost: authenticated((_, { input }, { models, user }) => {
      const post = new models.Post({
        _id: nanoid(),
        content: input.content,
        author: user.id,
        createdAt: Date.now(),
        likes: 0,
        comments: [],
      });
      post.save();
      return { post, user };
    }),
    createComment: authenticated((_, { input }, { models, user }) => {
      const comment = new models.Comment({
        _id: nanoid(),
        content: input.content,
        author: user.id,
        createdAt: Date.now(),
        likes: 0,
      });
      comment.save();
      return { comment, user };
    }),
  },
};

module.exports = resolvers;
