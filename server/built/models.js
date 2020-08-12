"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @format */
var mongoose_1 = require("mongoose");
var mongoose_2 = require("mongoose");
var userSchema = new mongoose_2.Schema({
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
    avatar: {
        type: String,
        required: true,
    },
    posts: [
        {
            type: mongoose_2.Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
    ],
    likedPosts: [
        {
            type: mongoose_2.Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
    ],
    images: {
        type: Array,
        required: true,
    },
    followers: [
        {
            type: mongoose_2.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    ],
    following: [
        {
            type: mongoose_2.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    ],
}, {
    collection: "Users",
});
var postSchema = new mongoose_2.Schema({
    description: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: String,
        required: true,
    },
    likes: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "User",
            required: true,
        },
    ],
    comments: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "Comment",
        },
    ],
}, {
    collection: "Posts",
});
var commentSchema = new mongoose_2.Schema({
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: "User",
    },
    parentPost: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: "Post",
    },
    createdAt: {
        type: String,
        required: true,
    },
    likes: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "User",
            required: true,
        },
    ],
}, {
    collection: "Comments",
});
var Comment = mongoose_1.default.model("Comment", commentSchema);
var Post = mongoose_1.default.model("Post", postSchema);
var User = mongoose_1.default.model("User", userSchema);
exports.default = {
    Comment: Comment,
    Post: Post,
    User: User,
};
