import express from 'express'
import getHomePage from '../Controller/HomeController'
import { authorizeAdmin, authenticate, authenticateEJS } from '../midderwere/midderwere'
import CategoriesController from '../Controller/CategoriesController'
import ProductController from '../Controller/ProductController'
import orderController from '../Controller/order/orderController'
import { uploadProductImg } from '../config/uploadsConfig'
const router = express.Router()
const initWebRoute = (app) => {
    router.get('/', authenticateEJS, authorizeAdmin, getHomePage)
    //authenticateEJS, authorizeAdmin, 

    //CATEGORY
    router.get('/category', authenticateEJS, authorizeAdmin, CategoriesController.getCategoryPage);
    //create
    router.get('/category/create', authenticateEJS, authorizeAdmin, CategoriesController.createCategory);
    router.post('/category/create', authenticateEJS, authorizeAdmin, CategoriesController.createCategory);
    //delete
    router.post('/category/delete/:id', authenticateEJS, authorizeAdmin, CategoriesController.deleteCategory);
    //update
    router.get('/category/update/:id', authenticateEJS, authorizeAdmin, CategoriesController.updateCategory);
    router.post('/category/update/:id', authenticateEJS, authorizeAdmin, CategoriesController.updateCategory);
    //search
    router.get('/category/search', authenticateEJS, authorizeAdmin, CategoriesController.searchCategoryByName);

    //PRODUCT
    router.get('/product', authenticateEJS, authorizeAdmin, ProductController.getProductPage);
    //create
    router.get('/product/create', authenticateEJS, authorizeAdmin, ProductController.createProduct);
    router.post('/product/create', authenticateEJS, authorizeAdmin, uploadProductImg.single('image_url'), ProductController.createProduct);

    //update
    router.get('/product/update/:product_id', authenticateEJS, authorizeAdmin, ProductController.updateProduct);
    router.post('/product/update/:product_id', authenticateEJS, authorizeAdmin, ProductController.updateProduct);
    //search
    router.get('/product/search', authenticateEJS, authorizeAdmin, ProductController.searchProductbyname);
    //delete
    router.post('/product/delete/:product_id', authenticateEJS, authorizeAdmin, ProductController.deleteProduct);

    //ORDER
    router.route('/order/:idOrder')
        .get(authenticateEJS, authorizeAdmin, orderController.detailOrder)
        .delete(authenticateEJS, authorizeAdmin, orderController.detailOrder)
    router.route('/order')
        .get(authenticateEJS, authorizeAdmin, orderController.listOrder)
        .post(authenticateEJS, authorizeAdmin, orderController.listOrder)
    router.route('/order/editOrder/:idOrder')
        .get(authenticateEJS, authorizeAdmin, orderController.updateOrder)
        .post(authenticateEJS, authorizeAdmin, orderController.updateOrder)
    router.post('/order/accect/:idOrder', authenticateEJS, authorizeAdmin, orderController.accectShiping);// đồng ý giao hàng
    router.post('/order/cancel/:idOrder', authenticateEJS, authorizeAdmin, orderController.cancelShiping);// hủy giao hàng
    router.post('/order/success/:idOrder', authenticateEJS, authorizeAdmin, orderController.shippingSuccess);// giao thành công
    // router.get('/user/:userId/orders', orderController.getOrderByIdUser);    
    // router.get('/orders', orderController.getAllOrder); 
    return app.use('/', router)
}
export default initWebRoute