import React from 'react'
import { useState, useEffect } from 'react';
import { detailProduct } from '../axiosService/product/productService';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import byOrder from '../components/order/byOrder'
import { addCart } from '../axiosService/cart/cartService';
export default function DetailProduct() {
    const { id } = useParams();
    const [data, setData] = useState([]); // State để lưu dữ liệu từ API
    const [loading, setLoading] = useState(true); // State để hiển thị trạng thái loading
    const [error, setError] = useState(null); // State để xử lý lỗi

    useEffect(() => {
        // Hàm fetch dữ liệu
        const fetchData = async () => {
            try {
                setLoading(true); // Bật trạng thái loading
                const response = await detailProduct(id);
                setData(response); // Lưu dữ liệu vào state
                console.log(response)
            } catch (err) {
                setError(err.message); // Xử lý lỗi
            } finally {
                setLoading(false); // Tắt trạng thái loading
            }
        };
        fetchData(); // Gọi hàm fetch dữ liệu
    }, [id]); // Mảng dependencies rỗng => chỉ chạy 1 lần sau khi component được render

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const fallbackImageUrl = 'https://cdn.dribbble.com/users/3512533/screenshots/14168376/web_1280___8_4x.jpg';
    return (
        <>
            <BackButton />
            <div className="bg-background  text-primary-foreground p-4 rounded-3xl shadow-xl max-w-2xl mx-auto mt-8 border-t-[5px] border-t-sky-700 border-l-[5px] border-l-purple-700">
                {data.map((product) => (
                    <div key={product.product_id}>
                        <img src={product.image_url ? `http://localhost:3001/${product.image_url}` : fallbackImageUrl} alt=""
                            className="w-full h-96 object-cover rounded-t-lg" />
                        <div className="p-4">
                            <h2 className="text-lg font-semibold">{product.product_name}</h2>
                            <p className="text-sm text-sky-800">{product.category_name}</p>
                            <p className="text-sm my-2">{product.description}</p>
                            <div className="flex justify-between items-center">
                                <p className="text-lg font-semibold">Price: ${product.price}</p>
                                <p className="text-sm text-yellow-800">Stock: {product.stock}</p>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                {
                                    <byOrder.byOneProduct idproduct={product.product_id} />
                                }
                                <p className="text-sm text-red-500">Discount: {product.discount}%</p>

                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleAddToCart(product.product_id)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
