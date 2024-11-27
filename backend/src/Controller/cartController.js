import Cart from "../model/sequelize/cartModel";
import Product from "../model/sequelize/ProductModel";
import { Op } from "sequelize";



const addCart = async (req, res) => {
    const userId = req.user.id;
    const {  productId, quantity } = req.body;
    
    try {

      const existingCart = await Cart.findOne({
        where: {
        userId : userId,
        productId : productId
        }
      });
  
      if (existingCart) {

        existingCart.quantity = parseInt(existingCart.quantity) + parseInt(quantity)
        await existingCart.save(); 
  
        return res.status(200).json({
          message: 'Cập nhật giỏ hàng thành công!',
          cart: existingCart
        });
      } else {
        // Nếu chưa có, thêm giỏ hàng mới
        const newCart = await Cart.create({
          userId: userId,
          productId: productId,
          quantity: quantity
        });
  
        return res.status(201).json({
          message: 'Add cart secessfully!',
          cart: newCart
        });
      }
    } catch (err) {
      console.error('error form cartController!:', err);
      return res.status(500).json({
        message: 'Đã xảy ra lỗi, vui lòng thử lại sau!',
        error: err.message
      });
    }
  };


  const getCart = async (req, res) => {
    const userId = req.user.id;
  
    try {
      // Lấy dữ liệu giỏ hàng kèm theo thông tin sản phẩm từ bảng Product
      const carts = await Cart.findAll({
        where: { userId },
        include: [
          {
            model: Product,
            as: 'product',
            attributes: ['product_name', 'price', 'image_url', 'description'],
          }
        ]
      });
  
      // Kiểm tra nếu giỏ hàng không có sản phẩm
      if (carts.length === 0) {
        return res.status(404).json({ message: 'Your cart is empty.' });
      }
  
      // Trả về thông tin giỏ hàng kèm theo sản phẩm và tính giá theo số lượng
      return res.status(200).json({
        message: 'YOUR CART!',
        carts: carts.map(cartItem => {
          const product = cartItem.product;
          const totalPrice = product.price * cartItem.quantity; // Tính tổng giá của sản phẩm dựa trên số lượng
  
          return {
            id: cartItem.id,
            userId: cartItem.userId,
            productId: cartItem.productId,
            quantity: cartItem.quantity,
            createdAt: cartItem.createdAt,
            updatedAt: cartItem.updatedAt,
            productName: product.product_name,
            price: product.price,
            totalPrice: totalPrice, // Tổng giá của sản phẩm
            imageUrl: product.image_url,
            description: product.description,
          };
        })
      });
  
    } catch (err) {
      console.error('Lỗi khi lấy giỏ hàng:', err);
      return res.status(500).json({ message: 'Error in cartController!', error: err.message });
    }
  };
  


const updateCart = async (req, res) => {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    try {
        const cart = await Cart.findOne({
            where: { userId, productId },
        });

        if (cart) {
            cart.quantity = parseInt(quantity);
            await cart.save();
            return res.status(200).json({ message: 'Cập nhật số lượng thành công!', cart });
        } else {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại trong giỏ hàng!' });
        }
    } catch (err) {
        console.error('Lỗi khi cập nhật giỏ hàng:', err);
        return res.status(500).json({ message: 'error form cartController!', error: err.message });
    }
};

const deleteCart = async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.body;

    try {
        const cart = await Cart.findOne({
            where: { userId, productId },
        });

        if (cart) {
            await cart.destroy();
            return res.status(200).json({ message: 'Xóa sản phẩm khỏi giỏ hàng thành công!' });
        } else {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại trong giỏ hàng!' });
        }
    } catch (err) {
        console.error('Lỗi khi xóa giỏ hàng:', err);
        return res.status(500).json({ message: 'error form cartController!', error: err.message });
    }
};

const clearCart = async (req, res) => {
    const userId = req.user.id;

    try {
        await Cart.destroy({
            where: { userId },
        });
        return res.status(200).json({ message: 'clear your cart seccessfully!' });
    } catch (err) {
        console.error('Lỗi khi xóa toàn bộ giỏ hàng:', err);
        return res.status(500).json({ message: 'error form cartController!', error: err.message });
    }
};



  export {
    addCart,
    getCart,
    updateCart,
    deleteCart,
    clearCart
  }