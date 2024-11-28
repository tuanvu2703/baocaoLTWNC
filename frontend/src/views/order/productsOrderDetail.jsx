import React, { useState, useEffect } from "react";
import orderService from "../../axiosService/order/orderService";
import getParamUrl from "../../components/getParamUrl";

const ProductsOrderDetail = () => {//{ quantity, actionQuantity }
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await orderService.getProductByCart();
                setProduct(data.data);
                console.log(data)
            } catch (err) {
                console.log('errrrrrr' + err);
            }
        };
        fetchData();
    }, []);
    // const handleQuantityChange = (value) => {
    //     const newQuantity = Math.max(1, value);
    //     actionQuantity(newQuantity);
    // };
    // if (!product) {
    //     return <div>Loading Pproduct ...</div>;
    // }
    return (
        <>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-3 px-4 text-left">Id</th>
                            <th className="py-3 px-4 text-left">Product</th>
                            <th className="py-3 px-4 text-left">Category</th>
                            <th className="py-3 px-4 text-left">Price</th>
                            <th className="py-3 px-4 text-left">Quantity</th>
                            <th className="py-3 px-4 text-left">Status</th>
                            <th className="py-3 px-4 text-left">Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product.map((product) => (
                            <tr key={product.id}>
                                <td className="py-3 px-4 border-b">{product.product_id}</td>
                                <td className="py-3 px-4 border-b">{product.product_name}</td>
                                <td className="py-3 px-4 border-b">{product.category_name}</td>
                                <td className="py-3 px-4 border-b">${product.price}</td>
                                <td className="py-3 px-4 border-b">{product.quantity}</td>
                                <td className="py-3 px-4 border-b">{product.status}</td>
                                <td className="py-3 px-4 border-b">
                                    {
                                        product.image_url ? (
                                            <div className="mb-4">
                                                <img src={product.image_url} alt={product.product_name} className="w-full h-auto rounded-lg" />
                                            </div>
                                        ) : (
                                            <div className="mb-4">No image available</div>
                                        )
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ProductsOrderDetail;
