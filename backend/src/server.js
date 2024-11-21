import express from "express";
import initWebRoute from "./router/webRouter";
import session from "express-session";
import viewEngine from "./viewEngine";
import cors from "cors"
import bodyParser from "body-parser";
import path from 'path'
import dotenv from 'dotenv/config'
import userRouter from './router/userRouter';


const app = express();

// cors 
app.use(cors());

//session
app.use(session({
    secret: 'keyboard Cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
// gọi session vào các trang ejs
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

//viewEngine
viewEngine(app);

//body - parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// router 
initWebRoute(app)
app.use('/user',userRouter)


//Thiết lập Express phục vụ các tệp tĩnh (như HTML, CSS, JS, hình ảnh) từ thư mục public.
//Các tệp trong thư mục này có thể truy cập công khai qua trình duyệt
app.use(express.static(path.join(__dirname, 'src')))
app.use(express.static('public'));

// port 8000
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})