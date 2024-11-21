
import jwt from "jsonwebtoken";
import * as UserModel from "../model/userModel.js";
import asyncHandler from "./asyncHandler.js";



const authenticate = async (req, res, next) => {
  const token = req.cookies.token; 
  if (!token) {
    return res.status(401).json({ message: "you need login to use the function" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await UserModel.getUserById(decoded.userId);
    console.log(req.user);
    if (!req.user) {
      return res.status(401).json({ message: "user not found." });
    }
    next(); 
  } catch (error) {
    console.error("Lỗi xác thực token:", error.message);
    return res.status(401).json({ message: "Token incorrect or exprins." });
  }
};

// const decodeToken = async (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (!token) {
//     return next(); // Nếu không có token, vẫn tiếp tục, nhưng username sẽ không có
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await UserModel.getUserById(decoded.userId).select("username"); // Chỉ lấy username
//     if (user) {
//       req.user = user; // Gán đối tượng người dùng vào req.user
//     }
//   } catch (error) {
//     console.error("Lỗi giải mã token:", error.message);
//   }
  
//   next(); // Tiếp tục cho các middleware hoặc route khác
// };

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role == 0) { 
    next();
  } else {
    res.status(403).json({ message: "you do not have fobidden to use the function." });
  }
};

export { authenticate, authorizeAdmin };