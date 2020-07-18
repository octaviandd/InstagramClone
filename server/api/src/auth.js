/** @format */

import jwt from "jsonwebtoken";

export const createToken = ({ id, role }) => jwt.sign({ id, role }, secret);

export const getUserFromToken = (token) => {
  try {
    const user = jwt.verify(token, secret);
    return models.User.findOne({ id: user.id });
  } catch (e) {
    return null;
  }
};

export const authenticated = (next) => (root, args, context, info) => {
  if (!context.user) {
    throw new Error("not auth");
  } else {
    return next(root, args, context, info);
  }
};
