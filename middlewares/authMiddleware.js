import JWT from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";
const userAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer "))
      return next(new ErrorHandler("Not authorized, no token"));

    const token = authHeader.split(" ")[1];
    const payLoad = JWT.verify(token, process.env.JWT_SECRET);

    req.user = payLoad; // Attach full payload for flexibility
    next();
  } catch (error) {
    next(new ErrorHandler("Not authorized, token failed"));
  }
};

export default userAuth;
