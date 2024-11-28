import React, { useState } from "react";
import orderService from "../../axiosService/order/orderService";
const CancelOrder = ({ idOrder }) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const handleCancelClick = () => {
        setShowConfirm(true);
    };
    const handleConfirm = async () => {
        console.log(idOrder)
        try {
            const res = await orderService.cancelOrder({ idorder: idOrder });
            console.log("Response:", res);
            if (res.success === true) {
                alert("Cancel successful.");
            } else {
                alert("nooooooo.");
            }
        } catch (error) {
            console.error("Error cancelling:", error);
            alert("noooooooa.");
        } finally {
            setShowConfirm(false);
        }
    };
    const handleCancel = () => {
        setShowConfirm(false);
    };

    return (
        <div>
            <button
                className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-red-600 py-2 px-4 border border-red-500 hover:border-transparent rounded ml-2"
                onClick={handleCancelClick}>
                Cancel
            </button>
            {showConfirm && (
                <div className="confirm-modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg text-center">
                        <p>Bạn có chắc chắn muốn hủy không?</p>
                        <div className="mt-4">
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                                onClick={handleConfirm}>
                                Xác nhận
                            </button>
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
                                onClick={handleCancel}>
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
};

export default CancelOrder;
