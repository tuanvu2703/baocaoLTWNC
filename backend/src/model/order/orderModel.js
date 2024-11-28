import connection from "../../DB/connectDB";
const addOrder = async (data) => {
    const { status, description, payment, idUserCreate, address, phone, email } = data;
    const dateTimeCreate = new Date().toISOString().slice(0, 19).replace('T', ' '); // YYYY-MM-DD HH:mm:ss
    const dateTimeUpdate = ""; 
    try {
        const [result] = await connection.query(
            "INSERT INTO orders (status, description, address, phone, email, dateTimeCreate, dateTimeUpdate, payment, idUserCreate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [status, description, address, phone, email, dateTimeCreate, dateTimeUpdate, payment, idUserCreate]
        );
        return result;
    } catch (error) {
        console.error('Failed to add order:', error.message);
        throw error; 
    }
};

const addOrderProduct = async (data) => {
    const { idorder, idproduct, product_name, category_id, price, created_at, status, quantity, img } = data;
    try {
        const [result] = await connection.query(
            "INSERT INTO orderproduct (idorder, idproduct, product_name, category_id, price, created_at, status, quantity, img) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [idorder, idproduct, product_name, category_id, price, created_at, status, quantity, img]
        );
        return result;
    } catch (error) {
        console.error('Failed to add order product:', error.message);
        throw error;
    }
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
const updateStatusOrder = async (id, status) => {
    try {
        const [result] = await connection.query(
            "UPDATE orders SET status = ? WHERE id = ?",
            [status, id]
        );
        return result;
    } catch (error) {
        console.error("Failed to update status order:", error.message);
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
const geProductById = async (id) => {
    try {
        const [rows] = await connection.query(
            "SELECT * FROM products WHERE product_id = ?",
            [id]
        );
        return rows[0];
    } catch (error) {
        console.error("Failed to get product by ID:", error.message);
        throw error;
    }
};
const getOrderByIdAndIdUser = async (userId, productId) => {
    try {
        const [rows] = await connection.query(
            "SELECT * FROM orders WHERE idUserCreate=? AND id = ?",
            [userId, productId ]
        );
        return rows[0];
    } catch (error) {
        console.error("Failed to get order by ID:", error.message,">..",userId,productId ,"..<");
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
const getAllProductByIdOrder = async (idOrder) => {
    try {
        const [rows] = await connection.query(
            "SELECT op.*, (SELECT c.category_name FROM categories c WHERE c.id = op.category_id) AS category_name FROM orderproduct op WHERE op.idorder = ?;",
            [idOrder]
        );
        if (!rows || rows.length === 0) {
            console.log(`No products found for order ID: ${idOrder}`);
            return [];
        }

        return rows; 
    } catch (error) {
        console.error("Error get products for order:", error.message);
        // throư Error("loixiiiiiiiii");
    }
};
// const getAllProductCart = async (id)=>{
//     try {
//         const [rows] = await connection.query(
//             " SELECT p.* FROM carts ca, products p WHERE ca.userId = 7 AND p.product_id = ca.productId;",
//             [id]
//         );
//         if (!rows || rows.length === 0) {
//             console.log(`No products found for cart IDuser: ${id}`);
//             return [];
//         }

//         return rows; 
//     } catch (error) {
//         console.error("Error get products for order:", error.message);
//         // throư Error("loixiiiiiiiii");
//     }
// }
const getProductsCart = async (userId)=>{
    try {
        const [rows] = await connection.query(
            "SELECT p.*,c.category_name FROM categories c, carts ca, products p WHERE ca.userId = ? AND p.product_id = ca.productId AND c.id = p.category_id;",
            [userId]
        );
        if (!rows || rows.length === 0) {
            console.log(`No products found for user ID: ${userId}`);
            return [];
        }

        return rows; 
    } catch (error) {
        console.error("Error get products for user:", error.message);
        // throư Error("loixiiiiiiiii");
    }
}
export default {
    addOrder,
    addOrderProduct,
    updateOrder,
    getOrderById,
    getOrderByIdUser,
    getAllOrder,
    deleteOrderById,
    getOrderByIdAndIdUser,
    geProductById,
    getAllProductByIdOrder,
    getProductsCart,
    updateStatusOrder,
    
}  