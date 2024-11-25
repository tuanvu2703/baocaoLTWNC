import express from 'express';
import apiOrderController from '../Controller/order/apiOrderController';
import { authenticate } from '../midderwere/midderwere';

// import upload from '../config/uploadsConfig';
// import { validate, validateRegister } from '../dto/register.dto';

const apiRouter = express.Router();

//Router API
apiRouter.route('/order')
    .get(apiOrderController.UserOrder, authenticate)//xong chưa test
    .post(apiOrderController.UserOrder, authenticate)//xong chưa test
apiRouter.route('/order/:orderId')
    .get(apiOrderController.UserOrderById, authenticate)//chưa xong
    .put(apiOrderController.UserOrderById, authenticate)//chưa xong
    .delete(apiOrderController.UserOrderById, authenticate)//chưa xong
apiRouter.route('/order/cancel/:orderId')
    .post(apiOrderController.UserCancelOrderById, authenticate)//chưa xong

export default apiRouter;