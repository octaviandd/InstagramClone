/** @format */
import mongoose from "mongoose";
import { Schema } from "mongoose";
import timestamps from "mongoose-timestamps";
import { composeWithMongoose } from "graphql-compose-mongoose";

const userSchema = new Schema({
  name: String,
  age: Number,
});

export const User = mongoose.model("User", userSchema);
