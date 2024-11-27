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
                        path: "category", // Dynamic route for categories
                        element: <ProductByCategory />,
                    },
                ]
            },
            {
                path: "orderOne",
                element: <OrderProduct />
            },

            {
                path: "user/profile", // Add UserProfile route
                element: <UserProfile />,
            },
            {
                path: "/search",
                element: <SearchProductName /> // Existing search route
            },

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
        path: "/*",
        element: <NoPage />,
    },
]);