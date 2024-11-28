// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import App from "./App";
import NoPage from "./views/NoPage";
import ProductPage from "./views/ProductPage";
import AllProduct from "./components/AllProduct";
import ProductByCategory from "./components/ProductByCategory";
import { Login } from "./components/Login";
import OrderProduct from "./views/order/orderProduct";
import Register from "./components/Register";
import UserProfile from "./components/profile";
import SearchProductName from "./views/SearchProductName";
import DetailProduct from "./views/DetailProduct";
import Order from "./views/order/order";
import OrderProductCart from "./views/order/orderProductCart";
import CurrentCart from "./components/currentCart";
import { ForgotPassword } from "./components/ForgotPassword";
import { VerifyOtp } from "./components/VerifyOtp";
import { ResetPassword } from "./components/ResetPassword";
import { ChangePassword } from "./components/ChangePassword";
import CancelOrder from "./views/order/cancelOrder";
// export default function Router() {
//     return (
//         <BrowserRouter>
//             <Routes>
//                 <Route path="/" element={<Layout />}>
//                     <Route index element={<App />} />
//                     <Route path="/product" element={<ProductPage />}>
//                         <Route index element={<AllProduct />} />
//                         <Route path="/product/category" element={<ProductByCategory />} />
//                     </Route>
//                     <Route path="*" element={<NoPage />} />
//                 </Route>
//             </Routes>
//         </BrowserRouter >
//     )
// }
export const route = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "/", element: <App /> },
            {
                path: "product",
                element: <ProductPage />,
                children: [
                    { index: true, element: <AllProduct /> },
                    {
                        path: "category",
                        element: <ProductByCategory />,
                    },
                ]
            },
            {
                path: "orderOne",
                element: <OrderProduct />
            },
            {
                path: "order",
                element: <Order />,
            },
            {
                path: "user/profile",
                element: <UserProfile />,
            },
            {
                path: "/search",
                element: <SearchProductName /> 
            },
            {
                path: "/product/:id",
                element: <DetailProduct /> 
            },
            {
                path: "/orderCart",
                element: <OrderProductCart />
            },
            {
                path: "/user/currentCart",
                element: <CurrentCart />
            },
            {
                path:"/user/changepassword",
                element: <ChangePassword />
            }
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },

    {
        path: "/forgotpassword",
        element: <ForgotPassword />,
    },

    {
        path: "/verifyotp",
        element: <VerifyOtp />,
    },

    {
        path: "/resetPassword",
        element: <ResetPassword />,
    },

    {
        path: "/*",
        element: <NoPage />,
    },
]);