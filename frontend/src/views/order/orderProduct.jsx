import React, { useState, useEffect } from "react";
import ProductOrderDetail from "./productOrderDetail";
import AccectByOrder from "../../components/order/accectByOrder";
import getParamUrl from "../../components/getParamUrl";
import orderService from "../../axiosService/order/orderService";
const OrderProduct = () => {
    const [formData, setFormData] = useState({
        idproduct: "",
        fullname: "",
        gender: "male",
        description: "",
        address: "",
        phone: "",
        email: "",
        paymentMethod: ""
    });
    const idproduct = getParamUrl({ name: "idproduct" });
    const [product, setProduct] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!idproduct) return;
                const data = await orderService.getProductById({ idproduct: idproduct });
                setProduct(data.data);
            } catch (err) {
                console.log('errrrrrr' + err);
            }
        };
        fetchData();
    }, [idproduct]);
    useEffect(() => {
        const fetchData = async () => {
            setFormData({ idproduct: idproduct });
        };
        fetchData();
        // console.log('limit')
    }, [idproduct]);

    const [accectBy, setAccectBy] = useState(false);
    const handAccectBy = () => {
        setAccectBy(true)
        console.log("Form Data Submitted: ", formData);
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
        setAccectBy(false); // Close the confirmation modal without submission
    };
    if (!product) {
        return <div className="text-center text-5xl text-red-600"></div>;
    }
    return (
        <div className="flex flex-row p-2 justify-center text-sm">
            <ProductOrderDetail />
            {accectBy && (
                <AccectByOrder
                    onConfirm={handAccectBy}
                    onCancel={handleCancel} />
            )}
            <form onSubmit={handleSubmit} className="w-2/3 max-w-2xl p-6 bg-white shadow-lg rounded-lg">
                <h2 className=" font-semibold text-gray-800 mb-6">Payment information</h2>
                {/* Họ tên */}
                <div className="mb-4">
                    <label htmlFor="fullname" className="block text-lg font-medium text-gray-700">FullName</label>
                    <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="enter fullname"
                    />
                </div>
                {/* Giới tính */}
                <div className="mb-4">
                    <label className="block font-medium text-gray-700">Gender</label>
                    <div className="flex items-center space-x-6 mt-2">
                        <div className="flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={formData.gender === "male"}
                                onChange={handleChange}
                                className="h-5 w-5 text-blue-600"
                            />
                            <label htmlFor="male" className="ml-2 text-gray-700">Male</label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={formData.gender === "female"}
                                onChange={handleChange}
                                className="h-5 w-5 text-pink-600"
                            />
                            <label htmlFor="female" className="ml-2 text-gray-700">Female</label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="other"
                                checked={formData.gender === "other"}
                                onChange={handleChange}
                                className="h-5 w-5 text-green-600"
                            />
                            <label htmlFor="other" className="ml-2 text-gray-700">other</label>
                        </div>
                    </div>
                </div>

                {/* Địa chỉ */}
                <div className="mb-4">
                    <label htmlFor="address" className="block font-medium text-gray-700">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="enter address"
                    />
                </div>

                {/* Điện thoại */}
                <div className="mb-4">
                    <label htmlFor="phone" className="block font-medium text-gray-700">Phone</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="enter phone"
                    />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label htmlFor="email" className="block font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="enter email"
                    />
                </div>

                {/* Hình thức thanh toán */}
                <div className="mb-6">
                    <label className="block font-medium text-gray-700">Payment method</label>
                    <select
                        id="payment-method"
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">choose payment method</option>
                        <option value="credit_card" >Payment upon receipt</option>
                        <option value="paypal" disabled>PayPal</option>
                        <option value="bank_transfer" disabled>Banking</option>
                    </select>
                </div>
                {/* Mô tả */}
                <div className="mb-4">
                    <label htmlFor="description" className="block font-medium text-gray-700">Description</label>
                    <textarea
                        type="description"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="enter description"
                    />
                </div>
                {/* Nút Submit */}
                <div className="mb-4">
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Pay
                    </button>
                </div>
            </form>
        </div>

    );
};

export default OrderProduct;