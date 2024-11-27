import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import byOrder from './order/byOrder';
import { getAllProduct } from '../axiosService/product/productService';
import { Link } from 'react-router-dom';
export default function AllProduct() {

  const [data, setData] = useState([]); // State để lưu dữ liệu từ API
  const [loading, setLoading] = useState(true); // State để hiển thị trạng thái loading
  const [error, setError] = useState(null); // State để xử lý lỗi

  useEffect(() => {
    // Hàm fetch dữ liệu
    const fetchData = async () => {
      try {
        setLoading(true); // Bật trạng thái loading
        const response = await getAllProduct();
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
    <div className='grid grid-cols-4 mx-5 gap-5'>
      {data.map((product) => (

        <Link key={product.product_id} to={`/product/${product.product_id}`} className="card bg-base-100 w-80 shadow-xl  border-t-[3px] border-l-[3px] border-t-sky-800 border-l-red-800">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="" />
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
      ))
      }
    </div >
  )
}
