/** @format */
import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  posts: {
    type: Array,
    require: true,
  },
  comments: {
    type: Array,
    require: true,
  },
  img: {
    type: String,
    require: true,
  },
  friends: {
    type: Array,
    require: true,
  },
});

export const User = mongoose.model("User", userSchema);
