// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import App from "./App";
import NoPage from "./views/NoPage";
import ProductPage from "./views/ProductPage";
import AllProduct from "./components/AllProduct";
export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<App />} />
                    <Route path="/products" element={<ProductPage />}>
                        <Route index element={<AllProduct />} />
                        <Route path="" element={<NoPage />} />
                    </Route>
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter >
    )
}