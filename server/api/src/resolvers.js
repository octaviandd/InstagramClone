/** @format */
import { nanoid } from "nanoid";
import { authenticated } from "./auth";
import bcrypt from "bcrypt";
import AWS from "aws-sdk";
const config = require("./s3");
const { extname } = require("path");
const salt = 10;

const resolvers = {
  Query: {
    getMe: authenticated(async (_, __, { user, models }) => {
      const presetUser = await models.User.findOne({ id: user.id });
      return presetUser;
    }),
    getUsers: authenticated(async (_, __, { models }) => {
      const users = await models.User.find({}).exec();
      return users;
    }),
    getPosts: authenticated(async (_, __, { user, models }) => {
      const posts = await models.Post.findMany({}).exec();
      return posts;
    }),
  },

  Mutation: {
    singleUpload: authenticated(async (_, { file }) => {
      const { encoding, filename, mimetype, createReadStream } = await file;
      const s3 = new AWS.S3(config.s3);
      const { Location } = await s3
        .upload({
          Body: createReadStream(),
          Key: `${nanoid()}${extname(filename)}`,
          ContentType: mimetype,
        })
        .promise();

      return {
        filename,
        mimetype,
        encoding,
        uri: Location,
      };
    }),
    createUser: async (_, { input }, { models, createToken }) => {
      const existing = await models.User.findOne({ email: input.email });
      if (existing) {
        throw new Error("User already exists.");
      }
      const user = new models.User({
        _id: nanoid(),
        name: input.name,
        password: await bcrypt.hash(input.password, salt),
        email: input.email,
        username: input.username,
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
        throw new Error("User doesn't exist");
      }
      const valid = await bcrypt.compare(input.password, user.password);
      if (!valid) {
        throw new Error("Invalid password");
      }
      const token = createToken(user);
      return { user, token };
    },
    createPost: authenticated(async (_, { input }, { models, user }) => {
      const presentUser = await models.User.findOne({ id: user.id });
      const post = new models.Post({
        _id: nanoid(),
        author: presentUser,
        description: input.description,
        picture: input.picture,
        createdAt: Date.now(),
        likes: 0,
        comments: [],
      });
      post.save();
      return post;
    }),
    createComment: authenticated(async (_, { input }, { models, user }) => {
      const parentPost = models.Post.findOne({ id: input.id });
      const parentUser = models.User.findOn({ id: user.id });
      const comment = new models.Comment({
        _id: nanoid(),
        content: input.content,
        author: parentUser,
        parentPost: parentPost,
        createdAt: Date.now(),
        likes: 0,
      });
      comment.save();
      return comment;
    }),
  },
};

module.exports = resolvers;
