
import jwt from "jsonwebtoken";
import * as UserModel from "../model/userModel.js";



// use with API (header: Authorization: Bearer token)
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

// gộp nhánh bị dư ra
// const authorizeAdmin = (req, res, next) => {
//   if (req.user && req.user.role === 0) {
//     next();
//   } else {
//     res.status(403).json({ message: "You do not have permission to use this function." });
//   }
// };



// gộp nhánh bị dư ra
//use with ejs (cookie: token, session)
// const authenticateEJS = async (req, res, next) => {
//   const token = req.cookies.jwt; 
//   if (!token) {
//     return res.status(401).json({ message: "Không có token. Vui lòng đăng nhập." });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await UserModel.findById(decoded.userId);
//     console.log('req user', req.user);
//     if (!req.user) {
//       return res.status(401).json({ message: "User not found." });
//     }
//     next();
//   } catch (error) {
//     console.error("Lỗi xác thực token:", error.message);
//     return res.status(401).json({ message: "Token incorrect or expired." });
//   }
// };


const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role === 0) {
    next();
  } else {
    res.status(403).json({ message: "You do not have permission to use this function." });
  }
};



//use with ejs (cookie: token, session)
const authenticateEJS = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect('/user/loginpage'); // Sửa thành res.redirect
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await UserModel.findById(decoded.userId);
    res.locals.user = req.user;
    console.log(req.user);
    if (!req.user) {
      return res.status(401).json({ message: "Không tìm thấy người dùng." });
    }
    next();
  } catch (error) {
    console.error("Lỗi xác thực token:", error.message);
    return res.status(401).json({ message: "Token không hợp lệ hoặc đã hết hạn." });
  }
};

export {

  authenticate,
  authorizeAdmin,
  authenticateEJS,

};