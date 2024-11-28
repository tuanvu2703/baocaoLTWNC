import React, { useEffect, useState } from 'react';
import orderService from '../../axiosService/order/orderService';
import CancelOrder from './cancelOrder';
const Order = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const result = await orderService.getAllOrder();
                if (result.success) {
                    setOrders(result.orders);
                } else {
                    console.log(result)
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <div>Loading Order ...</div>;
    }

    return (
        <div className="w-full h-full flex justify-center" >
            <div className="w-11/12 min-h-44 p-4 bg-white shadow-lg rounded-lg mt-4">
                <div className="w-full text-center text-3xl mb-6">List of Orders</div>

                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-100 border-b border-gray-200">
                            <th className="px-6 py-3 text-left text-gray-700">#</th>
                            <th className="px-6 py-3 text-left text-gray-700">ID</th>
                            <th className="px-6 py-3 text-left text-gray-700">Status</th>
                            <th className="px-6 py-3 text-left text-gray-700">Description</th>
                            <th className="px-6 py-3 text-left text-gray-700">Date/Time Created</th>
                            <th className="px-6 py-3 text-left text-gray-700">Payment</th>
                            <th className="px-6 py-3 text-center">Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.length > 0 ? (
                            orders.map((order, index) => (
                                <tr key={order.id} className="border-b border-gray-200">
                                    <td className="px-6 py-4 text-center">{index + 1}</td>
                                    <td className="px-6 py-4">{order.id}</td>
                                    <td className={`px-6 py-4 text-${order.status=="pending"?'blue':(order.status=="cancelled"?'red':'green')}-600`}>{order.status}</td>
                                    <td className="px-6 py-4">{order.description}</td>
                                    <td className="px-6 py-4">{order.dateTimeCreate}</td>
                                    <td className="px-6 py-4">{order.payment}</td>
                                    <td className="px-6 py-4 text-center ">
                                        <a href={`/order/${order.id}`}>
                                            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-blue-600 py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                                Detail
                                            </button>
                                        </a>
                                        {
                                            order.status == "pending" ? (
                                                <div>
                                                    <CancelOrder idOrder={order.id} />
                                                </div>
                                            ) : ("")
                                        }

                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-2">No orders available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Order;
