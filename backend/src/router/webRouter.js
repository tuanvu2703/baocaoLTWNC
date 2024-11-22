import express from 'express'
import getHomePage from '../Controller/HomeController'
import { authorizeAdmin, authenticate } from '../midderwere/midderwere'
import CategoriesController from '../Controller/CategoriesController'
import ProductController from '../Controller/ProductController'
const router = express.Router()
const initWebRoute = (app) => {
    router.get('/', getHomePage)


    //category
    router.get('/category', CategoriesController.getCategoryPage);
    router.post('/category/create', authenticate, CategoriesController.createCategory);
    //product
    router.get('/product', ProductController.getProductPage);
    router.post('/product/create', authenticate, ProductController.createProduct);

    return app.use('/', router)
}
export default initWebRoute