import React, { useState, useEffect } from "react";
import orderService from "../../axiosService/order/orderService";
import getParamUrl from "../../components/getParamUrl";

const ProductOrderDetail = () => {//{ quantity, actionQuantity }
    const [product, setProduct] = useState(null);
    const idproduct = getParamUrl({ name: "idproduct" });

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!idproduct) return;
                const data = await orderService.getProductById({ idproduct: idproduct });
                setProduct(data.data);
            } catch (err) {
                console.log('errrrrrr' + err);
            }
        };
        fetchData();
    }, [idproduct]);
    // const handleQuantityChange = (value) => {
    //     const newQuantity = Math.max(1, value);
    //     actionQuantity(newQuantity);
    // };
    if (!product) {
        return <div>Loading Pproduct ...</div>;
    }

    return (
        <div className="w-1/3  bg-white shadow-lg rounded-lg p-4">
            <h2 className=" font-semibold text-gray-800 mb-6">product detail</h2>
            <div className="mb-4">
                <strong>Category ID: </strong>
                <span>{product.category_id}</span>
            </div>
            <div className="flex flex-row items-center mb-4">
                <strong className="text-lg font-medium mr-2">Product:</strong>
                <h2 className="text-2xl font-semibold">{product.product_name}</h2>
            </div>
            <div className="mb-4">
                <strong>Status: </strong>
                <span>{product.status}</span>
            </div>
            {product.image_url ? (
                <div className="mb-4">
                    <img src={product.image_url} alt={product.product_name} className="w-full h-auto rounded-lg" />
                </div>
            ) : (
                <div className="mb-4">No image available</div>
            )}
            <div className="mb-4">
                <strong>Description: </strong>
                <p>{product.description}</p>
            </div>
            <div className="mb-4">
                <strong>Price: </strong>
                <span>${product.price}</span>
            </div>
            <div className="mb-4">
                <strong>Discount: </strong>
                <span>${product.discount}</span>
            </div>
            <div className="mb-4">
                <strong>Stock: </strong>
                <span>{product.stock}</span>
            </div>
            {/* <div className="mb-4 flex items-center">
                <label className="block text-lg font-medium text-gray-700 mr-4">Quantity:</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(Number(e.target.value))}
                    className="w-16 text-center border border-gray-300 focus:outline-none"
                    min="1"
                />
            </div> */}
        </div>
    );
}

export default ProductOrderDetail;
