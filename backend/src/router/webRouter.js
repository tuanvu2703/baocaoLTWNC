import express from 'express'
import getHomePage from '../Controller/HomeController'
import { authorizeAdmin, authenticate } from '../midderwere/midderwere'
import CategoriesController from '../Controller/CategoriesController'
import ProductController from '../Controller/ProductController'
import orderController from '../Controller/orderController'
const router = express.Router()
const initWebRoute = (app) => {
    router.get('/', getHomePage)


    //category
    router.get('/category', CategoriesController.getCategoryPage);
    router.post('/category/create', CategoriesController.createCategory);
    router.get('/category/search/:category_name', CategoriesController.searchCategorybyname);
    router.post('/category/update/:id', authenticate, CategoriesController.updateCategory);
    router.delete('/category/delete/:id', CategoriesController.deleteCategory);
    //product
    router.get('/product', ProductController.getProductPage);
    router.post('/product/create', authenticate, ProductController.createProduct);
    router.post('/product/update/:product_id', authenticate, ProductController.updateProduct);
    router.get('/product/search/:product_name', ProductController.searchProductbyname);
    router.delete('/product/delete/:product_id', authenticate, ProductController.deleteProduct);

    //order
    router.get('/order', orderController.listOrder)


    return app.use('/', router)
}
export default initWebRoute