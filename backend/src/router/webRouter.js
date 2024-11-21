import express from 'express'
import getHomePage from '../Controller/HomeController'


const router = express.Router()
const initWebRoute = (app) => {
    router.get('/', getHomePage)




    return app.use('/', router)
}
export default initWebRoute