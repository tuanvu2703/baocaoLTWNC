import sequelize from "../../DB/sequelizeDB";
import { DataTypes, Sequelize } from "sequelize";
import Product from "./ProductModel"; // Import Product model vào Cart model

const Cart = sequelize.define(
  "Cart",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    tableName: "carts",
    timestamps: true,
  }
);


Cart.belongsTo(Product, { foreignKey: 'productId', as: 'product' });  

export default Cart;



// import connection from '../DB/connectDB';


// const connection = require('./database');  // Đảm bảo đường dẫn đúng tới file kết nối cơ sở dữ liệu

// // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
// const checkIfProductInCart = async (userId, productId) => {
//     const [result] = await connection.execute(
//         'SELECT * FROM carts WHERE userId = ? AND productId = ?',
//         [userId, productId]
//     );
//     return result.length > 0 ? result[0] : null;
// };

// // Thêm sản phẩm mới vào giỏ hàng
// const addProductToCart = async (userId, productId, quantity) => {
//     await connection.execute(
//         'INSERT INTO carts (userId, productId, quantity, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())',
//         [userId, productId, quantity]
//     );
// };

// // Cập nhật số lượng sản phẩm trong giỏ hàng
// const updateProductQuantity = async (userId, productId, quantity) => {
//     const updatedQuantity = quantity;
//     await connection.execute(
//         'UPDATE carts SET quantity = ?, updatedAt = NOW() WHERE userId = ? AND productId = ?',
//         [updatedQuantity, userId, productId]
//     );
// };

// // Xoá sản phẩm khỏi giỏ hàng
// const deleteProductFromCart = async (userId, productId) => {
//     await connection.execute(
//         'DELETE FROM carts WHERE userId = ? AND productId = ?',
//         [userId, productId]
//     );
// };

// // Lấy tất cả sản phẩm trong giỏ hàng của người dùng
// const getCartByUserId = async (userId) => {
//     const [result] = await connection.execute(
//         'SELECT * FROM carts WHERE userId = ?',
//         [userId]
//     );
//     return result;
// };

// // Xoá tất cả sản phẩm trong giỏ hàng của người dùng
// const clearCartByUserId = async (userId) => {
//     await connection.execute(
//         'DELETE FROM carts WHERE userId = ?',
//         [userId]
//     );
// };


// export  {
//     checkIfProductInCart,
//     addProductToCart,
//     updateProductQuantity,
//     deleteProductFromCart,
//     getCartByUserId,
//     clearCartByUserId
// };
