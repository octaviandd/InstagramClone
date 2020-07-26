/** @format */

import jwt from "jsonwebtoken";
import models from "./models";

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
    throw new Error("You need to authenticate");
  } else {
    return next(root, args, context, info);
  }
};
