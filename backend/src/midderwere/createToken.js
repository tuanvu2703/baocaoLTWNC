import * as UserModel from "../model/userModel";
import jwt from "jsonwebtoken";

const generateToken = async (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });
    const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
  
    await UserModel.updateRefreshToken(userId, refreshToken);
  
    return {
      accessToken,
      refreshToken
    };
  };

  const refreshAccessToken = async (userId, receivedRefreshToken) => {
    const user = await UserModel.findById(userId);
    if (!user || user.refreshToken !== receivedRefreshToken) {
      throw new Error('Invalid refresh token');
    }
    try {
      jwt.verify(receivedRefreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
      throw new Error('Refresh token expired');
    }
    const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIREIN,
    });
  
    return { accessToken };
  };

export {
    generateToken,
    refreshAccessToken
};