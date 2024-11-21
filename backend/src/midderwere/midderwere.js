
import jwt from "jsonwebtoken";
import * as UserModel from "../model/userModel.js";



const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "You need to login to use this function" });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: "You need to login to use this function" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await UserModel.findById(decoded.userId);
    console.log('req user', req.user);
    if (!req.user) {
      return res.status(401).json({ message: "User not found." });
    }
    next();
  } catch (error) {
    console.error("Lỗi xác thực token:", error.message);
    return res.status(401).json({ message: "Token incorrect or expired." });
  }
};


const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role === 0) {
    next();
  } else {
    res.status(403).json({ message: "You do not have permission to use this function." });
  }
};
export { authenticate, authorizeAdmin };