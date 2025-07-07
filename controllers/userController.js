import ErrorHandler from "../utils/errorHandler.js";
import User from "../models/userModel.js";

// POST /register
export const userRegister = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new ErrorHandler("Please provide all the details", 400));
  }

  const user = await User.create({ name, email, password });
  if (!user) {
    return next(new ErrorHandler("User not created", 400));
  }
  user.save();
  //create jwt
  const token = user.createJWT();

  res.status(201).json({
    success: true,
    message: "User created successfully",
    user,
    token,
  });
};
// POST /login
export const userLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const checkEmail = await User.findOne({ email });
  if (!checkEmail) return next(new ErrorHandler("User not found", 400));

  const checkPassword = await checkEmail.matchPassword(password);
  if (!checkPassword) return next(new ErrorHandler("Incorrect password", 400));

  //create jwt
  const token = checkEmail.createJWT();

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    user: checkEmail,
    token,
  });
};
