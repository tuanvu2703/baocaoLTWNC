import * as UserModel from "../model/userModel";
import jwt from "jsonwebtoken";

const generateToken = async (userId, res) => {
    const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });
    const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES,
    });
    await UserModel.updateRefreshToken(userId, refreshToken);

    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return {
      accessToken,
      refreshToken
    };
  };

  const refreshAccessToken = async (req, res) => {
    const { userId, receivedRefreshToken } = req.body;
    try {
      const user = await UserModel.findById(userId);
      if (!user || user.refreshToken !== receivedRefreshToken) {
        return res.status(401).json({ message: 'Invalid refresh token' });
      }
      try {
        jwt.verify(receivedRefreshToken, process.env.JWT_REFRESH_SECRET);
      } catch (error) {
        return res.status(401).json({ message: 'Refresh token expired' });
      }
      const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES,
      });

      res.cookie("token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
  
      return res.status(200).json({ accessToken });
    } catch (error) {
      console.error('Error refreshing access token:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  

export {
    generateToken,
    refreshAccessToken
};