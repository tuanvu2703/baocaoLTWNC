import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import byOrder from './order/byOrder';
import { productByCategory } from '../axiosService/product/productService';
import CardProduct from './CardProduct';
export default function ProductByCategory() {
    const [data, setData] = useState([]); // State để lưu dữ liệu từ API
    const [loading, setLoading] = useState(true); // State để hiển thị trạng thái loading
    const [error, setError] = useState(null); // State để xử lý lỗi
    const location = useLocation(); // Lấy thông tin URL hiện tại
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    useEffect(() => {
        // Hàm fetch dữ liệu
        const fetchData = async () => {
            try {
                setLoading(true); // Bật trạng thái loading
                const response = await productByCategory(id);
                setData(response); // Lưu dữ liệu vào state
            } catch (err) {
                setError(err.message); // Xử lý lỗi
            } finally {
                setLoading(false); // Tắt trạng thái loading
            }
        };

        fetchData(); // Gọi hàm fetch dữ liệu
    }, [id]); // Mảng dependencies rỗng => chỉ chạy 1 lần sau khi component được render // Chạy lại khi `id` thay đổi
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (data.length === 0) return <p className="text-center text-xl">No product</p>;
    return (
        <div className='grid grid-cols-4 mx-5 gap-5'>
            {data.map((product) => (
                <CardProduct product={product} />
            ))}
        </div>
    )
}
