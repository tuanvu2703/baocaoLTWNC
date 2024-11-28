import React, { useState, useEffect } from 'react';
import { getCart, deleteCart, clearCart, updateCart } from '../axiosService/cart/cartService';
import { FaTrashAlt, FaPlus, FaMinus } from 'react-icons/fa';
import byOrder from './order/byOrder';
import { useNavigate } from 'react-router-dom';



 function CurrentCart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const response = await getCart(); // Gửi yêu cầu API
        if (response.data && response.data.carts && response.data.carts.length > 0) {
          setCartItems(response.data.carts); // Cập nhật giỏ hàng
          setMessage(null); // Không hiển thị message nếu có sản phẩm
        } 
      } catch (err) {
        if (err.response && err.response.status === 404) {
          // Xử lý trạng thái 404 từ backend
          setMessage(err.response.data.message || "Your cart is empty.");
          setCartItems([]); // Đảm bảo giỏ hàng rỗng
        } else {
          // Xử lý lỗi khác
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);
  console.log(cartItems, 'a')
  const handleDeleteItem = async (productId) => {
    try {
      await deleteCart(productId);
      setCartItems(cartItems.filter(item => item.productId !== productId));
    } catch (error) {
      alert('Failed to delete product');
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
      setCartItems([]);
      setMessage("Your cart is empty."); // Cập nhật thông báo sau khi xóa toàn bộ
    } catch (error) {
      alert('Failed to clear cart');
    }
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    const updatedProduct = { productId, quantity };
    try {
      await updateCart(updatedProduct);
      setCartItems(cartItems.map(item => item.productId === productId ? { ...item, quantity } : item));
    } catch (error) {
      alert('Failed to update quantity');
    }
  };

  const handleNavigateToDetail = (productId) => {
    navigate(`/product/${productId}`); // Chuyển hướng đến trang chi tiết sản phẩm
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (

      <div className="cart-container max-w-7xl mx-auto my-8 p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-md">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-10">
            <p className="text-xl font-semibold text-center text-gray-600 mb-4">
              Your cart is currently empty. Let's add some items to it and shop your heart out!
            </p>
            <button
              className="px-6 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600"
              onClick={() => window.location.href = '/product'}
            >
              Go to Shop
            </button>
          </div>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-4 border border-gray-300">Image</th>
                <th className="p-4 border border-gray-300">Product</th>
                <th className="p-4 border border-gray-300">Price</th>
                <th className="p-4 border border-gray-300">Quantity</th>
                <th className="p-4 border border-gray-300">Total</th>
                <th className="p-4 border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleNavigateToDetail(item.productId)} // Thêm sự kiện click vào hàng
                >
                  <td className="p-4 border border-gray-300 text-center">
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      className="w-24 h-24 object-cover mx-auto"
                    />
                  </td>
                  <td className="p-4 border border-gray-300 text-center">{item.productName}</td>
                  <td className="p-4 border border-gray-300 text-center">${item.price}</td>
                  <td className="p-4 border border-gray-300 text-center">
                    <div
                      className="flex justify-center items-center"
                      onClick={(e) => e.stopPropagation()} // Ngăn chặn sự kiện click hàng
                    >
                      <button
                        className="p-2 bg-gray-200 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpdateQuantity(item.productId, item.quantity - 1);
                        }}
                      >
                        <FaMinus />
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        className="p-2 bg-gray-200 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpdateQuantity(item.productId, item.quantity + 1);
                        }}
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </td>
                  <td className="p-4 border border-gray-300 text-center">${item.totalPrice}</td>
                  <td
                    className="p-4 border border-gray-300 text-center"
                    onClick={(e) => e.stopPropagation()} // Ngăn chặn sự kiện click hàng
                  >
                    <button
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteItem(item.productId);
                      }}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {cartItems.length > 0 && (
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={handleClearCart}
              className="px-6 py-2 bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-600"
            >
              Clear Cart
            </button>
            {byOrder.byProductCart(cartItems)}
          </div>
        )}
      </div>
  );
  
}

export default CurrentCart