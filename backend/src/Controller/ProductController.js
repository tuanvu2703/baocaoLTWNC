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

const updateProduct = async (req, res) => {
    try {
        const { product_id, product_name, description, price, discount, stock, image_url, category_id } = req.body;
        await productModel.updateProduct(product_name, description, price, discount, stock, image_url, category_id, product_id)
        res.status(200).json({ message: 'create seccesfully', data: req.body })
    }
    catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const searchProductbyname = async (req, res) => {
    try {
        const { product_name } = req.body;
        const result = await productModel.searchProductbyname(product_name);
        res.status(200).json({ message: 'search seccesfully', result })
    }
    catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteProduct = async (req, res) => {
    const { product_id } = req.body;
    const result = await productModel.deleteProduct(product_id);
    res.status(200).json({ message: 'delete seccesfully' })
}

export default { createProduct, getProductPage, updateProduct, searchProductbyname, deleteProduct }