"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/** @format */
var nanoid_1 = require("nanoid");
var auth_1 = require("./auth");
var bcrypt_1 = require("bcrypt");
var aws_sdk_1 = require("aws-sdk");
var config = require("./s3");
var extname = require("path").extname;
var salt = 10;
var resolvers = {
    Query: {
        getMe: auth_1.authenticated(function (_, __, _a) {
            var user = _a.user, models = _a.models;
            return __awaiter(void 0, void 0, void 0, function () {
                var presentUser;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, models.User.findOne({ _id: user.id }).populate({
                                path: "following",
                            })];
                        case 1:
                            presentUser = _b.sent();
                            return [2 /*return*/, presentUser];
                    }
                });
            });
        }),
        getUserById: auth_1.authenticated(function (_, _a, _b) {
            var input = _a.input;
            var models = _b.models;
            return __awaiter(void 0, void 0, void 0, function () {
                var userToBeReturned;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, models.User.findOne({
                                _id: input,
                            }).populate("posts")];
                        case 1:
                            userToBeReturned = _c.sent();
                            return [2 /*return*/, userToBeReturned];
                    }
                });
            });
        }),
        getUsers: auth_1.authenticated(function (_, __, _a) {
            var models = _a.models;
            return __awaiter(void 0, void 0, void 0, function () {
                var users;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, models.User.find({})];
                        case 1:
                            users = _b.sent();
                            return [2 /*return*/, users];
                    }
                });
            });
        }),
        getFollowers: auth_1.authenticated(function (_, _a, _b) {
            var input = _a.input;
            var models = _b.models;
            return __awaiter(void 0, void 0, void 0, function () {
                var currentUser;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, models.User.find({ _id: input }).populate("followers")];
                        case 1:
                            currentUser = _c.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }),
        getFollowedUsers: auth_1.authenticated(function (_, _a, _b) {
            var input = _a.input;
            var models = _b.models, user = _b.user;
            return __awaiter(void 0, void 0, void 0, function () {
                var users;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, models.User.find({ _id: user.id }).populate("following")];
                        case 1:
                            users = _c.sent();
                            return [2 /*return*/, users];
                    }
                });
            });
        }),
        getUserPosts: auth_1.authenticated(function (_, _a, _b) {
            var input = _a.input;
            var models = _b.models;
            return __awaiter(void 0, void 0, void 0, function () {
                var userPosts, newUsers;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, models.Post.find({}).populate("author")];
                        case 1:
                            userPosts = _c.sent();
                            newUsers = userPosts.filter(function (userPost) { return userPost.author._id === input; });
                            return [2 /*return*/, newUsers];
                    }
                });
            });
        }),
        getAllPosts: auth_1.authenticated(function (_, __, _a) {
            var models = _a.models;
            return __awaiter(void 0, void 0, void 0, function () {
                var posts;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, models.Post.find()
                                .populate("author")
                                .populate({ path: "comments", populate: { path: "author" } })];
                        case 1:
                            posts = _b.sent();
                            return [2 /*return*/, posts];
                    }
                });
            });
        }),
        getPost: auth_1.authenticated(function (_, _a, _b) {
            var input = _a.input;
            var models = _b.models;
            return __awaiter(void 0, void 0, void 0, function () {
                var foundPost;
                return __generator(this, function (_c) {
                    foundPost = models.Post.findOne({ _id: input })
                        .populate("author")
                        .populate({ path: "comments", populate: { path: "author" } });
                    return [2 /*return*/, foundPost];
                });
            });
        }),
        getPostComments: auth_1.authenticated(function (_, _a, _b) {
            var input = _a.input;
            var models = _b.models;
            return __awaiter(void 0, void 0, void 0, function () {
                var allComments, comments;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, models.Comment.find({})
                                .populate("author")
                                .populate("parentPost")];
                        case 1:
                            allComments = _c.sent();
                            comments = allComments.filter(function (comment) { return comment.parentPost._id.toString() === input; });
                            return [2 /*return*/, comments];
                    }
                });
            });
        }),
    },
    Mutation: {
        changeAvatar: auth_1.authenticated(function (_, _a, _b) {
            var file = _a.file;
            var user = _b.user, models = _b.models;
            return __awaiter(void 0, void 0, void 0, function () {
                var _c, encoding, filename, mimetype, createReadStream, s3, Location, currentUser;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, file];
                        case 1:
                            _c = _d.sent(), encoding = _c.encoding, filename = _c.filename, mimetype = _c.mimetype, createReadStream = _c.createReadStream;
                            s3 = new aws_sdk_1.default.S3(config.s3);
                            return [4 /*yield*/, s3
                                    .upload({
                                    Body: createReadStream(),
                                    Key: "" + nanoid_1.nanoid() + extname(filename),
                                    ContentType: mimetype,
                                })
                                    .promise()];
                        case 2:
                            Location = (_d.sent()).Location;
                            return [4 /*yield*/, models.User.findOneAndUpdate({ _id: user.id }, { avatar: Location }, function (res, err) {
                                    if (err) {
                                        console.log(err);
                                    }
                                    return res;
                                })];
                        case 3:
                            currentUser = _d.sent();
                            return [2 /*return*/, {
                                    filename: filename,
                                    mimetype: mimetype,
                                    encoding: encoding,
                                    uri: Location,
                                }];
                    }
                });
            });
        }),
        singleUpload: auth_1.authenticated(function (_, _a) {
            var file = _a.file;
            return __awaiter(void 0, void 0, void 0, function () {
                var _b, encoding, filename, mimetype, createReadStream, s3, Location;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, file];
                        case 1:
                            _b = _c.sent(), encoding = _b.encoding, filename = _b.filename, mimetype = _b.mimetype, createReadStream = _b.createReadStream;
                            s3 = new aws_sdk_1.default.S3(config.s3);
                            return [4 /*yield*/, s3
                                    .upload({
                                    Body: createReadStream(),
                                    Key: "" + nanoid_1.nanoid() + extname(filename),
                                    ContentType: mimetype,
                                })
                                    .promise()];
                        case 2:
                            Location = (_c.sent()).Location;
                            return [2 /*return*/, {
                                    filename: filename,
                                    mimetype: mimetype,
                                    encoding: encoding,
                                    uri: Location,
                                }];
                    }
                });
            });
        }),
        createUser: function (_, _a, _b) {
            var input = _a.input;
            var models = _b.models, createToken = _b.createToken;
            return __awaiter(void 0, void 0, void 0, function () {
                var existing, user, _c, _d, _e, token;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0: return [4 /*yield*/, models.User.findOne({ email: input.email })];
                        case 1:
                            existing = _f.sent();
                            if (existing) {
                                throw new Error("User already exists.");
                            }
                            _d = (_c = models.User).bind;
                            _e = {
                                name: input.name
                            };
                            return [4 /*yield*/, bcrypt_1.default.hash(input.password, salt)];
                        case 2:
                            user = new (_d.apply(_c, [void 0, (_e.password = _f.sent(),
                                    _e.email = input.email,
                                    _e.username = input.username,
                                    _e.createdAt = Date.now(),
                                    _e.avatar = "https://instagramcopy-octavian.s3.eu-central-1.amazonaws.com/profileimg.jpg",
                                    _e.posts = [],
                                    _e.images = [],
                                    _e.likedPosts = [],
                                    _e.followers = [],
                                    _e.following = [],
                                    _e)]))();
                            token = createToken(user);
                            user.save();
                            return [2 /*return*/, { user: user, token: token }];
                    }
                });
            });
        },
        loginUser: function (_, _a, _b) {
            var input = _a.input;
            var models = _b.models, createToken = _b.createToken;
            return __awaiter(void 0, void 0, void 0, function () {
                var user, valid, token;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, models.User.findOne({ email: input.email })];
                        case 1:
                            user = _c.sent();
                            if (!user) {
                                throw new Error("User doesn't exist");
                            }
                            return [4 /*yield*/, bcrypt_1.default.compare(input.password, user.password)];
                        case 2:
                            valid = _c.sent();
                            if (!valid) {
                                throw new Error("Invalid password");
                            }
                            token = createToken(user);
                            return [2 /*return*/, { user: user, token: token }];
                    }
                });
            });
        },
        createPost: auth_1.authenticated(function (_, _a, _b) {
            var input = _a.input;
            var models = _b.models, user = _b.user;
            return __awaiter(void 0, void 0, void 0, function () {
                var presentUser, post;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, models.User.findOne({ _id: user.id })];
                        case 1:
                            presentUser = _c.sent();
                            post = new models.Post({
                                author: presentUser,
                                description: input.description,
                                picture: input.picture,
                                createdAt: Date.now(),
                                likes: [],
                                comments: [],
                            });
                            presentUser.updateOne({ $addToSet: { posts: post } }, { useFindAndModify: false, new: true }, function (err, res) {
                                if (err)
                                    console.log(err);
                                return res;
                            });
                            post.save();
                            return [2 /*return*/, post];
                    }
                });
            });
        }),
        createComment: auth_1.authenticated(function (_, _a, _b) {
            var input = _a.input;
            var models = _b.models, user = _b.user;
            return __awaiter(void 0, void 0, void 0, function () {
                var parentUser, parentPost, comment, findComment;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            console.log(input);
                            return [4 /*yield*/, models.User.findOne({ _id: user.id })];
                        case 1:
                            parentUser = _c.sent();
                            return [4 /*yield*/, models.Post.findOne({
                                    _id: input._id,
                                })];
                        case 2:
                            parentPost = _c.sent();
                            return [4 /*yield*/, new models.Comment({
                                    content: input.content,
                                    author: parentUser,
                                    parentPost: parentPost,
                                    createdAt: Date.now(),
                                    likes: [],
                                })];
                        case 3:
                            comment = _c.sent();
                            return [4 /*yield*/, comment.save()];
                        case 4:
                            _c.sent();
                            console.log(comment);
                            return [4 /*yield*/, models.Comment.findOne({ _id: comment._id })];
                        case 5:
                            findComment = _c.sent();
                            parentPost.updateOne({ $addToSet: { comments: findComment } }, { useFindAndModify: false, new: true }, function (err, res) {
                                if (err)
                                    consolole.log(err);
                                return res;
                            });
                            return [2 /*return*/, comment];
                    }
                });
            });
        }),
        followUser: auth_1.authenticated(function (_, _a, _b) {
            var input = _a.input;
            var models = _b.models, user = _b.user;
            return __awaiter(void 0, void 0, void 0, function () {
                var userToBeFollowed, currentUser;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, models.User.findOne({ _id: input })];
                        case 1:
                            userToBeFollowed = _c.sent();
                            return [4 /*yield*/, models.User.findOneAndUpdate({ _id: user.id }, { $addToSet: { following: userToBeFollowed } }, { useFindAndModify: false, new: true }, function (err, res) {
                                    if (err)
                                        console.log(err);
                                    return res;
                                })];
                        case 2:
                            currentUser = _c.sent();
                            userToBeFollowed.updateOne({ $addToSet: { followers: currentUser } }, { useFindAndModify: false, new: true }, function (err, res) {
                                if (err)
                                    console.log(err);
                                return res;
                            });
                            return [2 /*return*/, userToBeFollowed];
                    }
                });
            });
        }),
        unfollowUser: auth_1.authenticated(function (_, _a, _b) {
            var input = _a.input;
            var user = _b.user, models = _b.models;
            return __awaiter(void 0, void 0, void 0, function () {
                var userToBeUnfollowed, currentUser;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, models.User.findOne({ _id: input })];
                        case 1:
                            userToBeUnfollowed = _c.sent();
                            return [4 /*yield*/, models.User.findOneAndUpdate({ _id: user.id }, { $pull: { following: userToBeUnfollowed._id } }, { useFindAndModify: false, new: true }, function (err, res) {
                                    if (err)
                                        console.log(err);
                                    return res;
                                })];
                        case 2:
                            currentUser = _c.sent();
                            userToBeUnfollowed.updateOne({ $pull: { followers: currentUser._id } }, { useFindAndModify: false, new: true }, function (err, res) {
                                if (err)
                                    console.log(err);
                                return res;
                            });
                            return [2 /*return*/, userToBeUnfollowed];
                    }
                });
            });
        }),
        likePost: auth_1.authenticated(function (_, _a, _b) {
            var input = _a.input;
            var models = _b.models, user = _b.user;
            return __awaiter(void 0, void 0, void 0, function () {
                var currentUser, postToBeLiked;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, models.User.findOne({ _id: user.id })];
                        case 1:
                            currentUser = _c.sent();
                            return [4 /*yield*/, models.Post.findOneAndUpdate({ _id: input }, { $addToSet: { likes: currentUser } }, { useFindAndModify: false, new: true }, function (err, res) {
                                    if (err)
                                        console.log(err);
                                    return res;
                                })];
                        case 2:
                            postToBeLiked = _c.sent();
                            currentUser.updateOne({ $addToSet: { likedPosts: postToBeLiked } }, { useFindAndModify: false, new: true }, function (err, res) {
                                if (err)
                                    console.log(err);
                                return res;
                            });
                            return [2 /*return*/, postToBeLiked];
                    }
                });
            });
        }),
        unlikePost: auth_1.authenticated(function (_, _a, _b) {
            var input = _a.input;
            var models = _b.models, user = _b.user;
            return __awaiter(void 0, void 0, void 0, function () {
                var currentUser, postToBeUnliked;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, models.User.findOne({ _id: user.id })];
                        case 1:
                            currentUser = _c.sent();
                            return [4 /*yield*/, models.Post.findOneAndUpdate({ _id: input }, { $pull: { likes: currentUser._id } }, { useFindAndModify: false, new: true }, function (err, res) {
                                    if (err)
                                        console.log(err);
                                    return res;
                                })];
                        case 2:
                            postToBeUnliked = _c.sent();
                            return [4 /*yield*/, currentUser.updateOne({ $pull: { likedPosts: postToBeUnliked._id } }, { useFindAndModify: false, new: true }, function (err, res) {
                                    if (err)
                                        console.log(err);
                                    return res;
                                })];
                        case 3:
                            _c.sent();
                            return [2 /*return*/, postToBeUnliked];
                    }
                });
            });
        }),
    },
};
module.exports = resolvers;
