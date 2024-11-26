import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios'
export default function ListCategory() {
    const [data, setData] = useState([]); // State để lưu dữ liệu từ API
    const [loading, setLoading] = useState(true); // State để hiển thị trạng thái loading
    const [error, setError] = useState(null); // State để xử lý lỗi
    const location = useLocation();
    const currentTab = data.find((category) => location.pathname === category.id);
    useEffect(() => {
        // Hàm fetch dữ liệu
        const fetchData = async () => {
            try {
                setLoading(true); // Bật trạng thái loading
                const response = await axios.get('http://localhost:3001/api/category');
                setData(response.data.listCategories); // Lưu dữ liệu vào state
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
        <div role="tablist" className="tabs tabs-bordered px-5 py-10">
            <Link role="tab" className="tab" to='/products'>Tất cả sản phẩm</Link>
            {data.map((category) => (
                <Link key={category.id} role="tab" className="tab tab-active">{category.category_name}-{category.total_products}</Link>
            ))}
        </div>
    )
}
