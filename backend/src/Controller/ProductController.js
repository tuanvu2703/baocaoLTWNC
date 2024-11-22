import productModel from '../model/productModel';

const createProduct = async (req, res) => {
    try {
        const { product_name, description, price, discount, stock, image_url, category_id } = req.body;
        await productModel.createProduct(product_name, description, price, discount, stock, image_url, category_id)
        res.status(200).json({ message: 'create seccesfully', data: req.body })
    }
    catch (erorr) {
        console.error('Error creating category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getProductPage = async (req, res) => {
    const listproduct = await productModel.getAllProduct();
    res.render("index", {
        title: "Sản phẩm",
        page: "products",
        data: listproduct
    })
}

export default { createProduct, getProductPage }