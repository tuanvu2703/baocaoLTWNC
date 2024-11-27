import sequelize from "../DB/sequelizeDB";
import { DataTypes } from "sequelize";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(700),
      allowNull: false,
    },
    fullname: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING(8),
      allowNull: true,
    },
    born: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(40),
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(13),
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      defaultValue: "/uploads/avatar/defaultavatar.png",
    },
    role: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 1,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    refreshToken: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
    OTP: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    OTPEXPRIES: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Create_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    Update_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

export default User;
