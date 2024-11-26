import express from 'express';
import apiOrderController from '../Controller/order/apiOrderController';
import { authenticate ,authorizeAdmin, authenticateEJS} from '../midderwere/midderwere';
import apiCategoryController from '../Controller/api/apiCategoryController';
import apiProductController from '../Controller/api/apiProductController';
// import upload from '../config/uploadsConfig';
// import { validate, validateRegister } from '../dto/register.dto';

const apiRouter = express.Router();
const initAPIRoute = (app) => {
    //Router API
    //CATEGORY
    apiRouter.get('/category', apiCategoryController.getCategoryPage);
    // apiRouter.post('/category/create', apiCategoryController.createCategory);
    // apiRouter.post('/category/update/:id', apiCategoryController.updateCategory);
    // apiRouter.delete('/category/delete/:id', apiCategoryController.deleteCategory);
    //PRODUCT
    apiRouter.get('/product', apiProductController.getProductPage);
    apiRouter.get('/category/search/:category_name', apiProductController.searchProductbyname);


    // Order
    apiRouter.route('/order')
        .get(authenticate, authorizeAdmin, authenticateEJS, apiOrderController.UserOrder)//xong chưa test
        .post(authenticate, authorizeAdmin, authenticateEJS, apiOrderController.UserOrder, authenticate)//xong chưa test
    apiRouter.route('/order/:orderId')
        .get(authenticate, authorizeAdmin , authenticateEJS,apiOrderController.UserOrderById, authenticate)//chưa xong
        .put(authenticate, authorizeAdmin , authenticateEJS,apiOrderController.UserOrderById, authenticate)//chưa xong
        .delete(authenticate, authorizeAdmin , authenticateEJS,apiOrderController.UserOrderById, authenticate)//chưa xong
    apiRouter.route('/order/cancel/:orderId')
        .post(authenticate, authorizeAdmin , authenticateEJS,apiOrderController.UserCancelOrderById, authenticate)//chưa xong
    return app.use("/api", apiRouter)
}
export default initAPIRoute;