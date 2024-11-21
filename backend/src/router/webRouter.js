import express from 'express'
import getHomePage from '../Controller/HomeController'
import { authorizeAdmin, authenticate } from '../midderwere/midderwere'
import CategoriesController from '../Controller/CategoriesController'

const router = express.Router()
const initWebRoute = (app) => {
    router.get('/', getHomePage)


    //category
    // router.post('/user/create', AuthMiddleware.checkRole("0"), UserController.createUser)
    router.get('/staff/category', authenticate, authorizeAdmin, (req, res) => {
        res.send('Welcome Admin');
    });
    return app.use('/', router)
}
export default initWebRoute