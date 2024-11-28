import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import orderService from '../../axiosService/order/orderService';
import CancelOrder from './cancelOrder';

const OrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const getDataOrderById = async (id) => {
        try {
            const response = await orderService.getDataOrderById(id);
            if (response.success) {
                setOrder(response.order);
                setProducts(response.products);
            } else {
                setError(response.message);
            }
        } catch (err) {
            setError('Error fetching the order data');
            console.error(err);
        }
    };
    useEffect(() => {
        if (id) {
            getDataOrderById(id);
            console.log('reder limit')
        }
    }, [id]);
    if (error) {
        return <div className="text-red-500">{error}</div>;
    }
    if (!order) {
        return <div>Loading.....</div>;
    }
    return (
        <div className="container mx-auto p-5">
            
            <div className="flex justify-between items-center w-full mb-4">
                <a href="/order">
                    <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Back to Orders
                    </button>
                </a>
                <h1 className="text-4xl font-bold mb-4 text-center">Order Details - {order.id}</h1>
                <div>
                    {
                        order.status=='pending'?(
                            <CancelOrder idOrder={order.id} />
                        ):(<div></div>)
                    }
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6 mt-2">
                <h2 className="text-2xl font-semibold mb-6">Order Information</h2>
                <div className="mb-4">
                    <p className="text-lg"><strong>Status:</strong> {order.status}</p>
                </div>
                <div className="mb-4">
                    <p className="text-lg"><strong>Description:</strong> {order.description}</p>
                </div>
                <div className="mb-4">
                    <p className="text-lg"><strong>Payment Method:</strong> {order.payment}</p>
                </div>
                <div className="mb-4">
                    <p className="text-lg"><strong>Address:</strong> {order.address}</p>
                </div>
                <div className="mb-4">
                    <p className="text-lg"><strong>Phone:</strong> {order.phone}</p>
                </div>
                <div className="mb-4">
                    <p className="text-lg"><strong>Email:</strong> {order.email}</p>
                </div>
                <div className="mb-4">
                    <p className="text-lg"><strong>Date Created:</strong> {order.dateTimeCreate}</p>
                </div>
                <div className="mb-4">
                    <p className="text-lg"><strong>Last Updated:</strong> {order.dateTimeUpdate}</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-3 px-4 text-left">Id</th>
                            <th className="py-3 px-4 text-left">Product</th>
                            <th className="py-3 px-4 text-left">Category</th>
                            <th className="py-3 px-4 text-left">Price</th>
                            <th className="py-3 px-4 text-left">Quantity</th>
                            <th className="py-3 px-4 text-left">Status</th>
                            <th className="py-3 px-4 text-left">Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td className="py-3 px-4 border-b">{product.id}</td>
                                <td className="py-3 px-4 border-b">{product.product_name}</td>
                                <td className="py-3 px-4 border-b">{product.category_name}</td>
                                <td className="py-3 px-4 border-b">${product.price}</td>
                                <td className="py-3 px-4 border-b">{product.quantity}</td>
                                <td className="py-3 px-4 border-b">{product.status}</td>
                                <td className="py-3 px-4 border-b">
                                    <img src={`http://localhost:3001/${product.img}`} alt={product.product_name} className="w-16 h-16 object-cover rounded-md" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderDetail;
