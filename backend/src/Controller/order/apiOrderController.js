import orderModel from "../../model/order/orderModel";

const UserOrder = async (req, res) => {
    const userId = req.user.id;
    if (req.method === "GET") {
        //lấy tất cả order dựa trên id user
        try {
            const orders = await orderModel.getOrderByIdUser(userId);
            if (!orders || orders.length === 0) {
                return res.status(404).json({ success: false, message: "not orders." });
            }
            return res.status(200).json({ success: true, orders: orders });
        } catch (error) {
            console.error("err get order :", error.message);
            return res.status(500).json({ success: false, message: "err get order ." });
        }
    } else if (req.method === "POST") {
        // try {
        //     const data = req.body;
        //     data.idUserCreate = userId;
        //     const result = await orderModel.addOrder(data);
        //     console.log('add success ' + result);
        //     // res.redirect("/");
        //     return res.status(200).json({
        //         success: true,
        //         message: "Order added successfully!",
        //         data: result.data,
        //     });
        // } catch (error) {
        //     console.error("Lỗi khi lấy đơn hàng của người dùng:", error.message);
        //     return res.status(500).json({ success: false, message: "Lỗi khi lấy đơn hàng." });
        // }
    } else {
        return res.status(405).json({ success: false, message: "method not f." });
    }
};
const UserOrderById = async (req, res) => {
    const userId = req.user.id;
    const { orderId } = req.params;
    if (req.method === "GET") {
        try {
            const orders = await orderModel.getOrderByIdAndIdUser(userId, orderId);
            const products = await orderModel.getAllProductByIdOrder(orderId);
            if (!orders || orders.length === 0) {
                return res.status(404).json({ success: false, message: "not order to uer." });
            }
            return res.status(200).json({ success: true, order: orders, products: products });
        } catch (error) {
            console.error("err get order:", error.message);
            return res.status(500).json({ success: false, message: "err get order." });
        }
    } else if (req.method === "POST") {
        //commingsoom
    } else if (req.method === "PUT") {
        try {
            const order = await orderModel.getOrderByIdAndIdUser(userId, orderId);
            const data = await orderModel.updateOrder(order)
            if (!data || data.length === 0) {
                return res.status(404).json({ success: false, message: "not order to user." });
            }
            return res.status(200).json({ success: true, data: data });
        } catch (error) {
            console.error("err get order:", error.message);
            return res.status(500).json({ success: false, message: "err get order." });
        }
    } else if (req.method === "DELETE") {
        //commingsoom
    } else {
        return res.status(405).json({ success: false, message: "req not fo." });
    }
};
const UserCancelOrderById = async (req, res) => {
    const userId = req.user.id;
    const { orderId } = req.params;
    if (req.method === "POST") {
        try {
            const order = await orderModel.getOrderByIdAndIdUser(userId, orderId);
            if (order.status == "pending") {
                if (!order || order.length === 0) {
                    return res.status(404).json({ success: false, message: "not order." });
                } else {
                    const updateCancel = await orderModel.updateStatusOrder(orderId, 'cancelled')
                    return res.status(200).json({ success: true, message: "order cancelled sucssess" })
                }
            } else {
                return res.status(500).json({ success: false, message: "order not pending" })
            }
        } catch (error) {
            return res.status(500).json({ success: false, message: "err not post",orderId })
        }
    } else {
        return res.status(405).json({ success: false, message: "req not fo." });
    }
};
const productShow = async (req, res) => {
    const { productId } = req.params;
    if (req.method === "GET") {
        try {
            const product = await orderModel.geProductById(productId);
            if (!product || product.length === 0) {
                return res.status(404).json({ success: false, message: "not data" });
            }
            return res.json({ data: product });
        } catch (error) {
            console.error("err get data:", error.message);
            return res.status(500).json({ success: false, message: "err get data." });
        }
    }
};
const productCart = async (req, res) => {
    const userId = req.user.id;
    if (req.method === "GET") {
        try {
            const products = await orderModel.getProductsCart(userId);
            if (!products || products.length === 0) {
                return res.status(404).json({ success: false, message: "not da ta" });
            }
            return res.json({ data: products });
        } catch (error) {
            console.error("err get data:", error.message);
            return res.status(500).json({ success: false, message: "err get data." });
        }
    }
};
const order = async (req, res) => {
    const userId = req.user.id;
    if (req.method === "GET") {
        res.json("not get cmd")
    } else if (req.method === "POST") {
        // {
        //     "status": "pending",
        //     "description": "Order for eledesd",
        //     "payment": "credit_card",
        //     "address": "ddddddddddddddddddddddd",
        //     "phone": "1234567890",
        //     "email": "ee@gmail.com",
        //     "orderProducts": [
        //         {
        //             "idproduct": 101,
        //             "category_id": 1,
        //             "price": 500,
        //             "quantity": 2,
        //             "img": "image1.jpg",
        //             "status": "in_stock",
        //             "product_name": "Smartphone exe"
        //         },
        //         {
        //             "idproduct": 102,
        //             "category_id": 2,
        //             "price": 150,
        //             "quantity": 1,
        //             "img": "image2.jpg",
        //             "status": "in_stock",
        //             "product_name": "Laptop exe"
        //         }
        //     ]
        // }   
        try {
            const { status, description, payment, orderProducts, address, phone, email } = req.body;
            if (Array.isArray(orderProducts) && orderProducts.length > 0) {
                const orderData = {
                    status, description, payment, idUserCreate: userId, address, phone, email
                }
                const orderResult = await orderModel.addOrder(orderData);
                const orderId = orderResult.insertId
                if (orderId) {
                    for (const product of orderProducts) {
                        const productData = {
                            idorder: orderId,
                            idproduct: product.idproduct,
                            product_name: product.product_name,
                            category_id: product.category_id,
                            price: product.price,
                            created_at: new Date(),
                            status: product.status || "pending",
                            quantity: product.quantity,
                            img: product.img,
                        };

                        await orderModel.addOrderProduct(productData);

                    }
                } else { return req.error("Error while id order or add product order:", error.message); }
                return res.status(200).json({
                    success: true,
                    message: "Order and products added successfully!",
                    order: orderData,
                    products: orderProducts,
                });
            }
        } catch (error) {
            console.error("Error while processing order:", error.message, req.body);
            return res.status(500).json({
                success: false,
                message: "Failed to process order.",
            });
        }

    } else {
        return res.json("Request method not suppppp.");
    }
}
export default {
    UserOrderById,
    UserOrder,
    UserCancelOrderById,
    productShow,
    productCart,
    order,
}