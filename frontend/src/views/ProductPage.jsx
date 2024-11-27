import React from 'react'
import { Outlet } from 'react-router-dom'
import ListCategory from '../components/ListCategory'
import { useEffect } from 'react';
import { useState } from 'react';
import { getAllCategory } from '../axiosService/category/categoryService';

export default function ProductPage() {
    const [dataCate, setDataCate] = useState([]); // State để lưu dữ liệu từ API
    const [loading, setLoading] = useState(true); // State để hiển thị trạng thái loading
    const [error, setError] = useState(null); // State để xử lý lỗi

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Turn on loading status
                const response = await getAllCategory();
                setDataCate(response); // Store data in state
            } catch (err) {
                setError(err.message); // Handle errors
            } finally {
                setLoading(false); // Turn off loading status
            }
        };

        fetchData(); // Call fetch data function
    }, []); // Empty dependency array => runs once after component mounts

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className='grid items-start'>
            <ListCategory data={dataCate} />
            <Outlet />
        </div>
    )
}
