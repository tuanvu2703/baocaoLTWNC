import express from 'express'
import getHomePage from '../Controller/HomeController'
import { authorizeAdmin, authenticate, authenticateEJS } from '../midderwere/midderwere'
import CategoriesController from '../Controller/CategoriesController'
import ProductController from '../Controller/ProductController'
import orderController from '../Controller/order/orderController'
const router = express.Router()
const initWebRoute = (app) => {
    router.get('/', getHomePage)
//authenticateEJS, authorizeAdmin, 

    //CATEGORY
    router.get('/category', CategoriesController.getCategoryPage);
    //create
    router.get('/category/create', CategoriesController.createCategory);
    router.post('/category/create', CategoriesController.createCategory);
    //delete
    router.post('/category/delete/:id', CategoriesController.deleteCategory);
    //update
    router.get('/category/update/:id', CategoriesController.updateCategory);
    router.post('/category/update/:id', CategoriesController.updateCategory);
    //search
    router.get('/category/search', CategoriesController.searchCategoryByName);

    //PRODUCT
    router.get('/product', ProductController.getProductPage);
    //create
    router.get('/product/create', ProductController.createProduct);
    router.post('/product/create', ProductController.createProduct);
    //update
    router.get('/product/update/:product_id', ProductController.updateProduct);
    router.post('/product/update/:product_id', ProductController.updateProduct);
    //search
    router.get('/product/search', ProductController.searchProductbyname);
    //delete
    router.post('/product/delete/:product_id', ProductController.deleteProduct);

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
    // router.get('/user/:userId/orders', orderController.getOrderByIdUser);    
    // router.get('/orders', orderController.getAllOrder); 
    return app.use('/', router)
}
export default initWebRoute