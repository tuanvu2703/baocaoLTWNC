import orderModel from "../../model/order/orderModel";

const UserOrder = async (req, res) => {
    const userId = req.user.id;
    if (req.method === "GET") {
        try {
            const orders = await orderModel.getOrderByIdUser(userId);
            if (!orders || orders.length === 0) {
                return res.status(404).json({ success: false, message: "Không có đơn hàng nào cho người dùng này." });
            }
            return res.status(200).json({ success: true, orders: orders });
        } catch (error) {
            console.error("Lỗi khi lấy đơn hàng của người dùng:", error.message);
            return res.status(500).json({ success: false, message: "Lỗi khi lấy đơn hàng." });
        }
    } else if (req.method === "POST") {
        try {
            const data = req.body;
            data.idUserCreate = userId;
            const result = await orderModel.addOrder(data);
            console.log('add success ' + result);
            // res.redirect("/");
            return res.status(200).json({
                success: true,
                message: "Order added successfully!",
                data: result.data,
            });
        } catch (error) {
            console.error("Lỗi khi lấy đơn hàng của người dùng:", error.message);
            return res.status(500).json({ success: false, message: "Lỗi khi lấy đơn hàng." });
        }
    } else {
        return res.status(405).json({ success: false, message: "Phương thức không hợp lệ." });
    }
};
const UserOrderById = async (req, res) => {
    const userId = req.user.id;
    const orderId = req.orderId;
    if (req.method === "GET") {
        try {
            const orders = await orderModel.getOrderByIdAndIdUser(userId, orderId);
            if (!orders || orders.length === 0) {
                return res.status(404).json({ success: false, message: "Không có đơn hàng nào cho người dùng này." });
            }
            return res.status(200).json({ success: true, orders: orders });
        } catch (error) {
            console.error("Lỗi khi lấy đơn hàng của người dùng:", error.message);
            return res.status(500).json({ success: false, message: "Lỗi khi lấy đơn hàng." });
        }
    } else if (req.method === "POST") {
        //commingsoom
    } else if (req.method === "PUT") {
        try {
            const order = await orderModel.getOrderByIdAndIdUser(userId, orderId);
            const data = await orderModel.updateOrder(order)
            if (!data || data.length === 0) {
                return res.status(404).json({ success: false, message: "Không có đơn hàng nào cho người dùng này." });
            }
            return res.status(200).json({ success: true, data: data });
        } catch (error) {
            console.error("Lỗi khi lấy đơn hàng của người dùng:", error.message);
            return res.status(500).json({ success: false, message: "Lỗi khi lấy đơn hàng." });
        }
    } else if (req.method === "DELETE") {
        //commingsoom
    } else {
        return res.status(405).json({ success: false, message: "Phương thức không hợp lệ." });
    }
};
const UserCancelOrderById = async (req, res) => {
    const userId = req.user.id;
    const orderId = req.orderId;
    if (req.method === "POST") {
        return;
    } else {
        return res.status(405).json({ success: false, message: "Phương thức không hợp lệ." });
    }
};
export default {
    UserOrderById,
    UserOrder,
    UserCancelOrderById,
}