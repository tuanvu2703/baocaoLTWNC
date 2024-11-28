import express from 'express';
import apiOrderController from '../Controller/order/apiOrderController';
import { authenticate, authorizeAdmin, authenticateEJS } from '../midderwere/midderwere';
import apiCategoryController from '../Controller/api/apiCategoryController';
import apiProductController from '../Controller/api/apiProductController';
// import upload from '../config/uploadsConfig';
// import { validate, validateRegister } from '../dto/register.dto';

const apiRouter = express.Router();
const initAPIRoute = (app) => {
    //Router API
    //CATEGORY
    //get all ccategory
    apiRouter.get('/category', apiCategoryController.getCategoryPage);

    // apiRouter.post('/category/create', apiCategoryController.createCategory);
    // apiRouter.post('/category/update/:id', apiCategoryController.updateCategory);
    // apiRouter.delete('/category/delete/:id', apiCategoryController.deleteCategory);

    //PRODUCT
    apiRouter.get('/product', apiProductController.getProductPage);
    apiRouter.get('/product/:product_id', apiProductController.findproductByID);
    apiRouter.get('/product/search/:product_name', apiProductController.searchProductbyname);
    apiRouter.get('/product/category/:category_id', apiProductController.findproductByCategory);


    // Order
    apiRouter.route('/order')
        .get(authenticate, apiOrderController.UserOrder)//lấy tất cả order dựa trên id user
        // .post(authenticate, apiOrderController.UserOrder)
    apiRouter.route('/orderPay')
        // .get(authenticate, apiOrderController.UserOrder)//xong chưa test
        .post(authenticate, apiOrderController.order)// thêm order từ người mua , data: order , products
    apiRouter.route('/order/productShow/:productId')
        .get(apiOrderController.productShow)//show thông tin một sản phẩm
    apiRouter.route('/order/:orderId')
        .get(authenticate, apiOrderController.UserOrderById)//lấy order của người dùng cụ thể, và id order
        // .put(authenticate, apiOrderController.UserOrderById)//chưa xong
        // .delete(authenticate, apiOrderController.UserOrderById)//chưa xong
    apiRouter.route('/order/cancel/:orderId')
        .post(authenticate, apiOrderController.UserCancelOrderById)//hủy mua một sản phẩm by user
    return app.use("/api", apiRouter)
}
export default initAPIRoute;