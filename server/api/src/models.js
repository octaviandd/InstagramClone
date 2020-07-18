/** @format */
import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
      auto: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    avatar: {
      type: String,
    },
    posts: {
      type: Array,
      required: true,
    },
    comments: {
      type: Array,
      required: true,
    },
    images: {
      type: String,
      required: true,
    },
    followers: {
      type: Array,
      required: true,
    },
    following: {
      type: Array,
      required: true,
    },
  },
  {
    collection: "Users",
  }
);

const postSchema = new Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      required: true,
    },
    comments: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  },
  {
    collection: "Posts",
  }
);

const commentSchema = new Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    originalPost: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      required: true,
    },
  },
  {
    collection: "Comments",
  }
);

const Comment = mongoose.model("Comment", commentSchema);
const Post = mongoose.model("Post", postSchema);
const User = mongoose.model("User", userSchema);

export default {
  models: {
    Comment,
    Post,
    User,
  },
};
