import express from 'express';
import apiOrderController from '../Controller/order/apiOrderController';
import { authenticate } from '../midderwere/midderwere';
import apiCategoryController from '../Controller/api/apiCategoryController';
// import upload from '../config/uploadsConfig';
// import { validate, validateRegister } from '../dto/register.dto';

const apiRouter = express.Router();
const initAPIRoute = (app) => {
    //Router API
    //Category
    apiRouter.get('/category', apiCategoryController.getCategoryPage);
    apiRouter.post('/category/create', apiCategoryController.createCategory);
    apiRouter.get('/category/search/:category_name', apiCategoryController.searchCategorybyname);
    apiRouter.post('/category/update/:id', authenticate, apiCategoryController.updateCategory);
    apiRouter.delete('/category/delete/:id', apiCategoryController.deleteCategory);
    //Order
    apiRouter.route('/order')
        .get(apiOrderController.UserOrder, authenticate)//xong chưa test
        .post(apiOrderController.UserOrder, authenticate)//xong chưa test
    apiRouter.route('/order/:orderId')
        .get(apiOrderController.UserOrderById, authenticate)//chưa xong
        .put(apiOrderController.UserOrderById, authenticate)//chưa xong
        .delete(apiOrderController.UserOrderById, authenticate)//chưa xong
    apiRouter.route('/order/cancel/:orderId')
        .post(apiOrderController.UserCancelOrderById, authenticate)//chưa xong
    return app.use("/api", apiRouter)
}
export default initAPIRoute;