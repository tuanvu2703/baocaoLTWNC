import axios from 'axios';
const getProductById = async ({ idproduct }) => {
    try {
        const response = await axios.get(`http://localhost:3001/api/order/productShow/${idproduct}`);
        return response.data;
    } catch (error) {
        return (error)
    }
}
const getProductByCart = async () => {
    try {
        
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No access token found in localStorage");
            return 'nottoken';  
        }
        
        const response = await axios.get("http://localhost:3001/api/order/productCart", {
            headers: { Authorization: `Bearer ${token}` },
        });
        
        return response.data;
    } catch (error) {
        return (error)
    }
}
const postOrder = async ({ data }) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No access token found in localStorage");
            return null;  
        }
        const response = await axios.post("http://localhost:3001/api/orderPay", data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("failed postOrder:", error.response?.data || error.message || error);
        return { error: true, message: error.message || "Something went wrong" };
    }
};
const getAllOrder = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No access token found in localStorage");
            return null;  
        }
        const response = await axios.get("http://localhost:3001/api/order", {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data && response.data.success) {
            return response.data;
        } else {
            console.error("Failed to fetch orders:", response.data.message);
            return { success: false, message: "Failed to fetch orders" };
        }
    } catch (error) {
        return (error)
    }
};
const cancelOrder = async ({idorder}) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No access token found in localStorage");
            return null;  
        }
        const response = await axios.post(`http://localhost:3001/api/order/cancel/${idorder}`,{}, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("failed postOrderCancel:", error);
        return { error: true, message: error.message || "Something went wrong" };
    }
};
export default {
    getProductById,
    getProductByCart,
    postOrder,
    getAllOrder,
    cancelOrder,
}