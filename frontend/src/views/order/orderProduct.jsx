import React, { useState, useEffect } from "react";
import ProductOrderDetail from "./productOrderDetail";
import AccectByOrder from "../../components/order/accectByOrder";
import getParamUrl from "../../components/getParamUrl";
import orderService from "../../axiosService/order/orderService";
import { useNavigate } from "react-router-dom";
import NotificationOrder from "./notificationOrder";
const OrderProduct = () => {
    const [formData, setFormData] = useState({
        status: "pending",
        description: "",
        payment: "credit_card",
        address: "",
        phone: "",
        email: "",
        orderProducts: []
    });
    const navigate = useNavigate();
    const idproduct = getParamUrl({ name: "idproduct" });
    const [product, setProduct] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!idproduct) return;
                const data = await orderService.getProductById({ idproduct: idproduct });
                const productData = data.data;
                const productForOrder = {
                    idproduct: productData.product_id,
                    category_id: productData.category_id,
                    price: productData.price,
                    quantity: 1,
                    img: productData.image_url || "",
                    status: "in_stock",
                    product_name: productData.product_name
                };
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    orderProducts: [...prevFormData.orderProducts, productForOrder]
                }));
                setProduct(productData);
            } catch (err) {
                console.log('errrrrrr' + err);
            }
        };
        fetchData();
    }, [idproduct]);

    const [accectBy, setAccectBy] = useState(false);
    const handAccectBy = async () => {
        setAccectBy(false);
        console.log("Form Data : ", formData);

        try {
            const data = await orderService.postOrder({ data: formData });
            console.log("Form Data Send Successfully: ", data);
            setSuccessMessage("Your order successfully!");
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (err) {
            console.error('Error posting order:', err);
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setAccectBy(true);

    };
    const handleCancel = () => {
        setAccectBy(false);
    };
    if (!product) {
        return <div className="text-center text-5xl text-red-600"></div>;
    }
    return (
        <div className="flex flex-row p-2 justify-center text-sm pt-5">
            <ProductOrderDetail />
            {accectBy && (
                <AccectByOrder
                    onConfirm={handAccectBy}
                    onCancel={handleCancel} />
            )}
            {successMessage && (
                <NotificationOrder successMessage={successMessage}/>
            )}
            <form onSubmit={handleSubmit} className="w-2/3 max-w-2xl p-6 bg-white shadow-lg rounded-lg ">
                <h2 className="font-semibold text-gray-800 mb-6">Order Information</h2>

                {/* Order Status */}
                {/* <div className="mb-4">
                    <label htmlFor="status" className="block text-lg font-medium text-gray-700">Status</label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div> */}

                {/* Description */}

                <div className="mb-4">
                    <label htmlFor="payment" className="block text-lg font-medium text-gray-700">Payment Method</label>
                    <select
                        id="payment"
                        name="payment"
                        value={formData.payment}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="Payment_upon_receipt">Payment upon receipt</option>
                        <option value="paypal" disabled>PayPal</option>
                        <option value="bank_transfer" disabled>Bank Transfer</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="block text-lg font-medium text-gray-700">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter address"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-lg font-medium text-gray-700">Phone </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter phone "
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter email address"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-lg font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter a description of the order"
                    />
                </div>
                <div className="mb-4">
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Submit Order
                    </button>
                </div>
            </form>

        </div>

    );
};

export default OrderProduct;