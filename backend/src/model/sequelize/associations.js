import Cart from "./cartModel";
import Product from "./ProductModel";
import User from "./userModel";

// Định nghĩa quan hệ giữa các mô hình
Product.hasMany(Cart, { foreignKey: "productId" });
Cart.belongsTo(Product, { foreignKey: "productId" });

User.hasMany(Cart, { foreignKey: "userId" });
Cart.belongsTo(User, { foreignKey: "userId" });
export { Cart, Product, User };