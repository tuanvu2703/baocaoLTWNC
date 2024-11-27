import React from 'react'
import { Outlet } from 'react-router-dom'
import ListCategory from '../components/ListCategory'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios'

export default function ProductPage() {
    const [dataCate, setDataCate] = useState([]); // State để lưu dữ liệu từ API
    const [loading, setLoading] = useState(true); // State để hiển thị trạng thái loading
    const [error, setError] = useState(null); // State để xử lý lỗi
    useEffect(() => {
        // Hàm fetch dữ liệu
        const fetchData = async () => {
            try {
                setLoading(true); // Bật trạng thái loading
                const response = await axios.get('http://localhost:3001/api/category');
                setDataCate(response.data.listCategories); // Lưu dữ liệu vào state
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
        <div>
            <ListCategory data={dataCate} />
            <Outlet />
        </div>
    )
}
