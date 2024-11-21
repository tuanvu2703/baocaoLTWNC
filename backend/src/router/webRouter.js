import express from 'express'
import getHomePage from '../Controller/HomeController'
import { authorizeAdmin, authenticate } from '../midderwere/midderwere'
import CategoriesController from '../Controller/CategoriesController'

const router = express.Router()
const initWebRoute = (app) => {
    router.get('/', getHomePage)


    //category
    // router.post('/user/create', AuthMiddleware.checkRole("0"), UserController.createUser)
    router.get('/staff/category/create', CategoriesController.getCreateCategoryPage);
    router.post('/staff/category/create', authenticate, CategoriesController.createCategory);

    return app.use('/', router)
}
export default initWebRoute