import React, { useState, useEffect } from 'react';
import { getCart, deleteCart, clearCart, updateCart } from '../axiosService/cart/cartService';
import { FaTrashAlt, FaPlus, FaMinus } from 'react-icons/fa';

export default function CurrentCart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const response = await getCart();  // Lấy dữ liệu giỏ hàng
        console.log(response);
        
        if (response.data && response.data.carts.length > 0) {
          setCartItems(response.data.carts); 
        } else {
          setCartItems([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="cart-container">
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item flex justify-between items-center mb-4 p-4 border-b">
              <img src={item.imageUrl} alt={item.productName} className="w-24 h-24 object-cover mr-4" />
              <div className="flex-grow">
                <h3 className="font-bold">{item.productName}</h3>
                <p>Price: ${item.price}</p>
                <p>Total: ${item.totalPrice}</p>
                <div className="flex items-center">
                  <button
                    className="mr-2 p-2 bg-gray-200 rounded-full"
                    onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                  >
                    <FaMinus />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="ml-2 p-2 bg-gray-200 rounded-full"
                    onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
              <button
                className="p-2 bg-red-500 text-white rounded-full"
                onClick={() => handleDeleteItem(item.productId)}
              >
                <FaTrashAlt />
              </button>
            </div>
          ))}
        </div>
      )}
      {cartItems.length > 0 && (
        <button
          onClick={handleClearCart}
          className="mt-4 p-2 bg-blue-500 text-white rounded-full"
        >
          Clear Cart
        </button>
      )}
    </div>
  );
}
