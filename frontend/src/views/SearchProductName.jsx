import React from 'react'
import byOrder from '../components/order/byOrder'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { searchProduct } from '../axiosService/product/productService';
import { Link } from 'react-router-dom';
export default function SearchProductName() {

    const [results, setResults] = useState([]); // State để lưu dữ liệu từ API
    const [loading, setLoading] = useState(true); // State để hiển thị trạng thái loading
    const [error, setError] = useState(null); // State để xử lý lỗi
    // get url
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query');
    useEffect(() => {
        // Hàm fetch dữ liệu
        const fetchData = async () => {
            try {
                setLoading(true); // Bật trạng thái loading
                const response = await searchProduct(query);
                setResults(response); // Lưu dữ liệu vào state

            } catch (err) {
                setError(err.message); // Xử lý lỗi
            } finally {
                setLoading(false); // Tắt trạng thái loading
            }
        };
        fetchData(); // Gọi hàm fetch dữ liệu
    }, [query]); // Mảng dependencies rỗng => chỉ chạy 1 lần sau khi component được render
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (results.length === 0) return <p>No products found</p>

    return (
        <div className='mt-10 mx-5'>
            <h1 className='mb-5 font-semibold'>search results: "{query}"</h1>
            <div className='grid grid-cols-4 gap-5'>
                {results.map((product) => (
                    <Link key={product.product_id} to={`/product/${product.product_id}`} className="card bg-base-100 w-80 shadow-xl  border-t-[3px] border-l-[3px] border-t-sky-800 border-l-red-800">
                        <figure>
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                alt="Shoes" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{product.product_name}</h2>
                            <p>Price:{product.price}</p>
                            <div className="card-actions justify-end">
                                {
                                    <byOrder.byOneProduct idproduct={product.product_id} />
                                }
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
