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
      const presentUser = await models.User.findOne({ _id: user.id });
      return presentUser;
    }),
    getUserById: authenticated(async (_, { input }, { models }) => {
      const userToBeReturned = await models.User.findOne({
        _id: input,
      }).populate("posts");
      return userToBeReturned;
    }),
    getUsers: authenticated(async (_, __, { models }) => {
      const users = await models.User.find({});
      return users;
    }),
    getFollowers: authenticated(async (_, { input }, { models }) => {
      const currentUser = await models.User.find({ _id: input }).populate(
        "followers"
      );
    }),
    getFollowedUsers: authenticated(async (_, { input }, { models }) => {
      const currentUser = await models.User.find({ _id: input }).populate(
        "following"
      );
      const allUsers = await models.User.find({});
      const userThatYouFollow = currentUser.filter(currentUser);
    }),
    getUserPosts: authenticated(async (_, { input }, { models }) => {
      const userPosts = await models.Post.find({}).populate("author");
      const newUsers = userPosts.filter(
        (userPost) => userPost.author._id === input
      );
      return newUsers;
    }),
    getAllPosts: authenticated(async (_, __, { models }) => {
      const posts = await models.Post.find().populate("author");
      return posts;
    }),
    getPost: authenticated(async (_, { input }, { models }) => {
      const foundPost = models.Post.findOne({ _id: input });
      return foundPost;
    }),
    getPostComments: authenticated(async (_, { input }, { models }) => {
      const newComments = await models.Comment.find()
        .populate("parentPost")
        .populate("author");
      const foundComments = newComments.filter(
        (comment) => comment.parentPost._id === input
      );
      return foundComments;
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
      console.log(user);
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
      const presentUser = await models.User.findOne({ _id: user.id });
      const post = new models.Post({
        author: presentUser,
        description: input.description,
        picture: input.picture,
        createdAt: Date.now(),
        likes: [],
        comments: [],
      });

      presentUser.updateOne(
        { $addToSet: { posts: post } },
        { useFindAndModify: false, new: true },
        function (err, res) {
          if (err) console.log(err);
          return res;
        }
      );

      post.save();
      return post;
    }),
    createComment: authenticated(async (_, { input }, { models, user }) => {
      const parentUser = await models.User.findOne({ _id: user.id });
      const parentPost = await models.Post.findOne({
        _id: input.id,
      });
      const comment = new models.Comment({
        content: input.content,
        author: parentUser,
        parentPost: parentPost,
        createdAt: Date.now(),
        likes: [],
      });

      comment.save();
      return comment;
    }),
    followUser: authenticated(async (_, { input }, { models, user }) => {
      const userToBeFollowed = await models.User.findOne({ _id: input });

      const currentUser = await models.User.findOneAndUpdate(
        { _id: user.id },
        { $addToSet: { following: userToBeFollowed } },
        { useFindAndModify: false, new: true },
        function (err, res) {
          if (err) console.log(err);
          return res;
        }
      );

      userToBeFollowed.updateOne(
        { $addToSet: { followers: currentUser } },
        { useFindAndModify: false, new: true },
        function (err, res) {
          if (err) console.log(err);
          return res;
        }
      );

      return userToBeFollowed;
    }),
    unfollowUser: authenticated(async () => {
      const userToBeUnfollowed = await models.User.findOne({ _id: input });
      const currentUser = await models.User.findOneAndUpdate(
        { _id: user.id },
        { $addToSet: { following: userToBeFollowed } },
        { useFindAndModify: false, new: true },
        function (err, res) {
          if (err) console.log(err);
          return res;
        }
      );
      userToBeUnfllowed.updateOne(
        { $addToSet: { followers: currentUser } },
        { useFindAndModify: false, new: true },
        function (err, res) {
          if (err) console.log(err);
          return res;
        }
      );

      return userToBeUnfollowed;
    }),
    likePost: authenticated(async (_, { input }, { models, user }) => {
      const currentUser = await models.User.findOne({ _id: user.id });

      const postToBeLiked = models.Post.updateOne(
        { _id: input },
        { $addToSet: { likes: currentUser } },
        { useFindAndModify: false, new: true },
        (err, res) => {
          if (err) console.log(err);
          return res;
        }
      );

      return postToBeLiked;
    }),
    unlikePost: authenticated(async (_, { input }, { models, user }) => {
      const currentUser = await models.User.findOne({ _id: user.id });

      const postToBeUnliked = models.Post.updateOne(
        { _id: input },
        { $pull: { likes: currentUser } },
        (err, res) => {
          if (err) console.log(err);
          return res;
        }
      );

      return postToBeUnliked;
    }),
  },

  // Post: {
  //   comments: async (parent, _, { models }) => {
  //     console.log("hello");
  //     const foundComments = await models.Comment.find({});
  //     console.log(foundComments);
  //     return foundComments;
  //   },
  // },
};

module.exports = resolvers;
