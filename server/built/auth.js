"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorized = exports.authenticated = exports.getUserFromToken = exports.createToken = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var apollo_server_express_1 = require("apollo-server-express");
exports.createToken = function (_a) {
    var id = _a.id;
    return jsonwebtoken_1.default.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: "12h" });
};
exports.getUserFromToken = function (token) {
    try {
        var user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        return user;
    }
    catch (e) {
        return null;
    }
};
exports.authenticated = function (next) { return function (root, args, context, info) {
    if (!context.user) {
        throw new apollo_server_express_1.AuthenticationError("You need to authenticate");
    }
    else {
        return next(root, args, context, info);
    }
}; };
exports.authorized = function (role, next) { return function (root, args, context, info) {
    if (context.user.role !== role) {
        throw new apollo_server_express_1.AuthenticationError("You don't have the " + role + " permissions");
    }
    else {
        return next(root, args, context, info);
    }
}; };
