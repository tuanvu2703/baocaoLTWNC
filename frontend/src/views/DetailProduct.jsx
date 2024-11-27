import React from 'react'
import { useState, useEffect } from 'react';
import { detailProduct } from '../axiosService/product/productService';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
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
            } catch (err) {
                setError(err.message); // Xử lý lỗi
            } finally {
                setLoading(false); // Tắt trạng thái loading
            }
        };

        fetchData(); // Gọi hàm fetch dữ liệu
    }, []); // Mảng dependencies rỗng => chỉ chạy 1 lần sau khi component được render
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <>
            <BackButton />
            <div className="bg-background  text-primary-foreground p-4 rounded-3xl shadow-xl max-w-2xl mx-auto mt-8 border-t-[5px] border-t-sky-700 border-l-[5px] border-l-purple-700">
                {data.map((product) => (
                    <div>
                        <img src="https://openui.fly.dev/openui/300x200.svg?text=Product+Image" alt=""
                            className="w-full h-80 object-cover rounded-t-lg" />
                        <div className="p-4">
                            <h2 className="text-lg font-semibold">{product.product_name}</h2>
                            <p className="text-sm text-sky-800">{product.category_name}</p>
                            <p className="text-sm my-2">{product.description}</p>
                            <div className="flex justify-between items-center">
                                <p className="text-lg font-semibold">Price: ${product.price}</p>
                                <p className="text-sm text-yellow-800">Stock: {product.stock}</p>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <p className="text-sm text-red-500">Discount: {product.discount}%</p>
                                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
