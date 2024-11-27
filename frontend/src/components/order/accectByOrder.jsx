import React from "react";
const AccectByOrder = ({ onConfirm, onCancel }) => {
    return (
        <div className="flex fixed top-0 left-0 w-screen h-screen justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="relative z-10 w-4/5 max-w-md p-6 bg-white shadow-lg rounded-lg">
                <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">Xác Nhận Đơn Hàng</h3>
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition duration-300 ease-in-out"
                    >
                        Xác Nhận Mua Hàng
                    </button>
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition duration-300 ease-in-out"
                    >
                        Hủy Mua Hàng
                    </button>
                </div>
            </div>
        </div>

    );
};

export default AccectByOrder;
