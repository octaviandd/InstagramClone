/** @format */
import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    username: {
      type: String,
      required: true,
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
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true,
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
        required: true,
      },
    ],
    images: {
      type: Array,
      required: true,
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    ],
  },
  {
    collection: "Users",
  }
);

const postSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      required: true,
    },
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    collection: "Posts",
  }
);

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    parentPost: {
      type: Schema.Types.ObjectId,
      ref: "Post",
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
  Comment: Comment,
  Post: Post,
  User: User,
};
