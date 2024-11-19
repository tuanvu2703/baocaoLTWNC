import express from 'express'


const router = express.Router()
const initWebRoute = (app) => {
    // router.get("/",)
    return app.use('/', router)
}
export default initWebRoute