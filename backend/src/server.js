import express from "express";
import initWebRoute from "./router/webRouter";
import session from "express-session";
import viewEngine from "./views/viewEngine";
import cors from "cors"
import bodyParser from "body-parser";
import path from 'path'
import dotenv from 'dotenv/config'
import userRouter from './router/userRouter';
import apiRouter from "./router/apiRouter";
import cookieParser from 'cookie-parser'
// import methodOverride from 'method-override';
const app = express();

// cors 

app.use(cors());
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    credentials: true,
  };
//session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

//cookie
app.use(cookieParser());


// gọi session vào các trang ejs
// app.use((req, res, next) => {
//     res.locals.user = req.user;
//     next();
// });

//config path uploads img
// Cấu hình đường dẫn tĩnh cho 'uploads'
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use(express.static(path.join(__dirname, 'public')));


//không có cái này không sài css trong file public được
app.use(express.static('public'));


//viewEngine
viewEngine(app);

//body - parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// router 
initWebRoute(app)
app.use('/user', userRouter)
app.use('/api', apiRouter)
//Thiết lập Express phục vụ các tệp tĩnh (như HTML, CSS, JS, hình ảnh) từ thư mục public.
//Các tệp trong thư mục này có thể truy cập công khai qua trình duyệt
// app.use(express.static(path.join(__dirname, 'src')))
// app.use(express.static('public'));

// port 3001
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`NemoShop listening  ${port}`)
})