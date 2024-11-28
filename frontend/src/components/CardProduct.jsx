import React from 'react'
import byOrder from './order/byOrder'
import { Link } from 'react-router-dom'
import { FaCartPlus } from 'react-icons/fa';
import { addCart } from '../axiosService/cart/cartService';

export default function CardProduct({ product }) {
    const imageUrl = product.image_url ? `http://localhost:3001/${product.image_url}` : 'https://cdn.dribbble.com/users/3512533/screenshots/14168376/web_1280___8_4x.jpg';
    const handleAddToCart = async (productId) => {
        try {

            const data = {
                productId: productId,
                quantity: "1"
            };
            await addCart(data);
            alert('Product added to cart');
        } catch (error) {
            console.error('Error adding product to cart:', error);
            alert('Failed to add product to cart');
        }
    };
    return (
        <div key={product.product_id} className="card bg-base-100 w-80 shadow-xl border-t-[3px] border-l-[3px] border-t-sky-800 border-l-red-800">
            <figure>
                <img
                    className='w-full h-[250px]'
                    src={imageUrl}
                    alt={product.product_name} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{product.product_name}</h2>
                <p>{product.category_name}</p>
                <p>Price: {product.price}</p>
                <div className="card-actions justify-end">
                    <byOrder.byOneProduct idproduct={product.product_id} />
                </div>
                <div className="card-actions justify-end">
                    <Link to={`/product/${product.product_id}`} className="btn btn-secondary mr-2">
                        View Details
                    </Link>
                    <button
                        className="btn btn-primary"
                        onClick={() => handleAddToCart(product.product_id)}
                    >
                        <FaCartPlus className="mr-2" /> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}
