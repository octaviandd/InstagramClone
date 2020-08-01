/** @format */

import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-express";

export const createToken = ({ id }) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "12h" });

export const getUserFromToken = (token) => {
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return user;
  } catch (e) {
    return null;
  }
};

export const authenticated = (next) => (root, args, context, info) => {
  if (!context.user) {
    throw new AuthenticationError("You need to authenticate");
  } else {
    return next(root, args, context, info);
  }
};

export const authorized = (role, next) => (root, args, context, info) => {
  if (context.user.role !== role) {
    throw new AuthenticationError(`You don't have the ${role} permissions`);
  } else {
    return next(root, args, context, info);
  }
};
