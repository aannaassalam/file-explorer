import jwt from "jsonwebtoken";
import AppError from "../AppError";
import User from "../Models/user";
import config from "../config";

export const checkUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    jwt.verify(token, config.auth.jwtSecret, async function (err, decoded) {
      if (err) {
        throw new AppError(0, "Please login to continue!", 401);
      }
      const user = await User.findById(decoded?._id, {
        password: 0,
        _v: 0,
      });
      if (!user) throw new AppError(0, "User not found", 401);
      next(user);
    });
  } catch (err) {
    return next(err);
  }
};

export const getUserSocket = async (auth, socket) => {
  try {
    const { token } = auth;
    let global_user = null;
    jwt.verify(token, config.auth.jwtSecret, async function (err, decoded) {
      if (err) {
        socket.disconnect();
        // throw new AppError(0, "Please login to continue!", 401);
      }
      const user = await User.findById(decoded?._id, {
        password: 0,
        _v: 0,
      });
      if (!user) {
        socket.disconnect();
        // throw new AppError(0, "User not found", 401);
      }
      global_user = user;
    });
    return global_user;
  } catch (err) {
    socket.disconnect();
    // throw new AppError(0, "Please login to continue", 401);
  }
};
