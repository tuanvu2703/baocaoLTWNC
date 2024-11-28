import productModel from '../model/productModel'
import categoryModel from '../model/categoryModel';
import multer from 'multer'
const createProduct = async (req, res) => {
    const listCategories = await categoryModel.getAllCategory();
    if (req.method === "GET") {
        res.render('index',
            {
                title: "Create Product",
                page: "createProduct",
                category: listCategories
            }
        )
    }
    if (req.method === "POST") {
        const image_url = req.file ? `uploads/product/${req.file.filename}` : null;
        console.log('img: ', image_url)
        console.log('file name', req.file.filename, "req file", req.file);
        const { product_name, description, price, discount, stock, category_id } = req.body;
        const result = await productModel.createProduct(product_name, description, price, discount, stock, image_url, category_id)
        //alert
        console.log(result);
        req.session.message = "Product created successfully!";
        res.redirect("/Product");
    }
}

const getProductPage = async (req, res) => {
    const listproduct = await productModel.getAllProduct();
    res.render("index", {
        title: "Products",
        page: "products",
        data: listproduct
    })
}

const updateProduct = async (req, res) => {
    if (req.method === "GET") {
        const id = req.params.product_id;
        const listCategories = await categoryModel.getAllCategory();
        const oneIdProduct = await productModel.findproductByID(id);
        res.render('index',
            {
                title: "Update Product",
                page: "updateProduct",
                data: oneIdProduct[0],
                category: listCategories

            }
        )
    };
    
    if (req.method === "POST") {
        const id = req.params.product_id
        const { product_id, product_name, description, price, discount, stock, image_url, category_id } = req.body;
        console.log(req.body)
        const result = await productModel.updateProduct(product_name, description, price, discount, stock, image_url, category_id, id)
        //alert
        req.session.message = "Product updated successfully!";
        res.redirect("/product");
    }
}

const searchProductbyname = async (req, res) => {
    const { product_name } = req.query;
    const result = await productModel.searchProductbyname(product_name);
    res.render("index", {
        title: "search result",
        page: "products",
        data: result
    })
}

const deleteProduct = async (req, res) => {
    const id = req.params.product_id;
    await productModel.deleteProduct(id)    
        .then(() => { req.session.message = `Product deleted successfully!` })
        .catch(() => { req.session.message = `This Product cannot be deleted` }
        )
    res.redirect("/product");
}

export default { createProduct, getProductPage, updateProduct, searchProductbyname, deleteProduct }