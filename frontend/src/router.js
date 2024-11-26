// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import App from "./App";
import NoPage from "./views/NoPage";
import ProductPage from "./views/ProductPage";
import AllProduct from "./components/AllProduct";
import ProductByCategory from "./components/ProductByCategory";
import { Login } from "./views/Login";
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
            }
        ]
    },
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/*",
        element: <NoPage />,
    },
]);