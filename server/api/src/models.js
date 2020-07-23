/** @format */
import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    _id: {
      type: String,
      auto: false,
      required: true,
    },
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
      type: String,
      required: true,
      auto: false,
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
    _id: {
      type: String,
      required: true,
      auto: false,
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
  Comment: Comment,
  Post: Post,
  User: User,
};
