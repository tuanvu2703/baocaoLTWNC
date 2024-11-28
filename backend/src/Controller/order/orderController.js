import orderModel from "../../model/order/orderModel";

let indexRender = 'index';
const listOrder = async (req, res) => {
    //render nhiều đơn hàng
    if (req.method === "GET") {
        try {
            const orders = await orderModel.getAllOrder();
            return res.render(indexRender, {
                title: "Order Page",
                page: "order/listOrder",
                orders: orders,
            });
        } catch (error) {
            console.error("Error fetching orders:", error.message);
            return res.status(500).send("Failed to load orders.");
        }
    } else if (req.method == "POST") {
        const data = req.body;
        const result = await orderModel.addOrder(data);
        console.log('add success ' + result);
        // res.redirect("/");
        res.status(200).json({
            success: true,
            message: "Order added successfully!",
            data: result.data,
        });
    } else {
        return;
    }

};

const detailOrder = async (req, res) => {
    const { idOrder } = req.params;
    if (!idOrder) {
        return res.status(400).send("Order ID is required.");
    }
    //render một đơn hàng
    if (req.method === "GET") {
        try {
            const order = await orderModel.getOrderById(idOrder);
            const products = await orderModel.getAllProductByIdOrder(idOrder);
            if (!order || order.length === 0) {
                return res.status(404).json({ success: false, message: "not order." });
            }
            return res.render(indexRender, {
                title: "Order Page",
                page: "order/detailOrder",
                order: order,
                products: products
            });
        } catch (error) {
            console.error("Error fetching orders:", error.message);
            return res.status(500).send("Failed to load orders.");
        }
    }
    else if (req.method === "DELETE") {
        try {
            const result = await orderModel.deleteOrderById(idOrder);
            if (result.affectedRows > 0) {
                return res.status(200).json({
                    success: true,
                    message: "Order deleted successfully!",
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: "Order not found or already deleted.",
                });
            }
        } catch (error) {
            console.error("Error deleting order:", error.message);
            return res.status(500).send("Failed to delete order.");
        }
    }
    else {
        return;
    }
}
const updateOrder = async (req, res) => {
    const { idOrder } = req.params;
    if (!idOrder) {
        return res.status(400).send("Order ID is required.");
    }
    //render một đơn hàng
    if (req.method === "GET") {
        try {
            const order = await orderModel.getOrderById(idOrder);
            return res.render(indexRender, {
                title: "Order Page",
                page: "order/updateOrder",
                order: order,
            });
        } catch (error) {
            console.error("Error fetching orders:", error.message);
            return res.status(500).send("Failed to load orders.");
        }
    }
    //cập nhật đơn hàng
    else if (req.method === "POST") {
        try {
            const data = req.body;
            if (!data.status || !data.description || !data.payment) {
                return res.status(400).send("All fields (status, description, payment) are required.");
            }
            data.id = idOrder;
            const result = await orderModel.updateOrder(data);
            console.log('Order update success:', result);

            return res.render(indexRender, {
                title: "Notification ",
                mess: "Order updated success",
                page: "components/notification",
                backUrl: "/order",
                nameButton: "OK"
            });;
        } catch (error) {
            console.error("Error updating order:", error.message);
            return res.status(500).send("Failed to update order.");
        }
    }
    else {
        return res.console.log('not req');
        ;
    }
}
const accectShiping = async (req, res) => {
    const { idOrder } = req.params;
    if (!idOrder) {
        return res.status(400).send("Order ID is required.");
    }
    if (req.method === "POST") {
        try {
            if (!idOrder) {
                return res.status(400).send("All fields are required.");
            }
            const result = await orderModel.updateStatusOrder(idOrder, "completed");
            console.log('Order update success:', result);
            return res.render(indexRender, {
                title: "Notification ",
                mess: "you accect Order successs",
                page: "components/notification",
                backUrl: "/order",
                nameButton: "OK"
            });;
        } catch (error) {
            console.error("Error updating order:", error.message);
            return res.status(500).send("Failed to update order.");
        }
    }
    else {
        return res.console.log('not req');
        ;
    }
}
const cancelShiping = async (req, res) => {
    const { idOrder } = req.params;
    if (!idOrder) {
        return res.status(400).send("Order ID is required.");
    }
    if (req.method === "POST") {
        try {
            if (!idOrder) {
                return res.status(400).send("All fields are required.");
            }
            const result = await orderModel.updateStatusOrder(idOrder, "cancelled");
            console.log('Order update success:', result);
            return res.render(indexRender, {
                title: "Notification ",
                mess: "you cancelled Order successs",
                page: "components/notification",
                backUrl: "/order",
                nameButton: "OK"
            });;
        } catch (error) {
            console.error("Error updating order:", error.message);
            return res.status(500).send("Failed to update order.");
        }
    }
    else {
        return res.console.log('not req');
        ;
    }
}
const shippingSuccess = async (req, res) => {
    const { idOrder } = req.params;
    if (!idOrder) {
        return res.status(400).send("Order ID is required.");
    }
    if (req.method === "POST") {
        try {
            if (!idOrder) {
                return res.status(400).send("All fields are required.");
            }
            const result = await orderModel.updateStatusOrder(idOrder, "success");
            console.log('Order update success:', result);
            return res.render(indexRender, {
                title: "Notification ",
                mess: "you success Order successs",
                page: "components/notification",
                backUrl: "/order",
                nameButton: "OK"
            });;
        } catch (error) {
            console.error("Error updating order:", error.message);
            return res.status(500).send("Failed to update order.");
        }
    }
    else {
        return res.console.log('not req');
        ;
    }
}
export default {
    listOrder,
    detailOrder,
    updateOrder,
    accectShiping,
    cancelShiping,
    shippingSuccess,
}