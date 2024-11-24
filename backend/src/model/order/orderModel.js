import connection from "../../DB/connectDB";
const addOrder = async (data) => {
    const { status, description, payment, idUserCreate } = data;
    const dateCreate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const timeCreate = new Date().toTimeString().slice(0, 8); // HH:mm:ss
    try {
        const [result] = await connection.query(
            "INSERT INTO orders (status, description, dateCreate, timeCreate, payment, idUserCreate) VALUES (?, ?, ?, ?, ?, ?)",
            [status, description, dateCreate, timeCreate, payment, idUserCreate]
        );
        return result;
    } catch (error) {
        console.error('Failed to add order:', error.message);
        throw error;
    }
    // {
    //     "status":"cho xac nhan",
    //     "description":"khongmota",
    //     "payment":"thanhtoan",
    //     "idUserCreate":"123"
    // }
};
const getAllOrder = async () => {
    try {
        const [rows] = await connection.query("SELECT * FROM orders");
        if (!rows || rows.length === 0) {
            console.log("No orders found.");
            return []; 
        }
        return rows;
    } catch (error) {
        console.error("Failed to get all orders:", error.message);
        throw error;
    }
};

const updateOrder = async (data) => {
    const { id, status, description, payment } = data;
    try {
        const [result] = await connection.query(
            "UPDATE orders SET status = ?, description = ?, payment = ? WHERE id = ?",
            [status, description, payment, id]
        );
        return result;
    } catch (error) {
        console.error("Failed to update order:", error.message);
        throw error;
    }
};
const getOrderById = async (id) => {
    try {
        const [rows] = await connection.query(
            "SELECT * FROM orders WHERE id = ?",
            [id]
        );
        return rows[0];
    } catch (error) {
        console.error("Failed to get order by ID:", error.message);
        throw error;
    }
};
const getOrderByIdAndIdUser = async (userId, orderId) => {
    try {
        const [rows] = await connection.query(
            "SELECT * FROM orders WHERE idUserCreate=?, id = ?",
            [orderId, userId]
        );
        return rows[0];
    } catch (error) {
        console.error("Failed to get order by ID:", error.message);
        throw error;
    }
};
const getOrderByIdUser = async (idUserCreate) => {
    try {
        const [rows] = await connection.query(
            "SELECT * FROM orders WHERE idUserCreate = ?",
            [idUserCreate]
        );
        return rows;
    } catch (error) {
        console.error("Failed to get orders by user ID:", error.message);
        throw error;
    }
};
const deleteOrderById = async (idOrder) => {
    try {
        const [result] = await connection.query(
            "DELETE FROM orders WHERE id = ?",
            [idOrder]
        );
        return result; 
    } catch (error) {
        console.error("Error deleting order:", error.message);
        throw error;
    }
};

export default {
    addOrder,
    updateOrder,
    getOrderById,
    getOrderByIdUser,
    getAllOrder,
    deleteOrderById,
    getOrderByIdAndIdUser,
}  