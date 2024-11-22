import connection from "../DB/connectDB";

const createProduct = async (product_name, description, price, discount, stock, image_url, category_id) => {
    try {
        const [result] = await connection.execute(`INSERT INTO products(product_name, description, price, discount, stock, image_url,category_id) VALUES(?, ?, ?, ?, ?, ?, ?)`, [product_name, description, price, discount, stock, image_url, category_id]);
        return result
    }
    catch (error) {
        console.log('lỗi gì đó không biết: ', error);
        throw error;
    }
}

const getAllProduct = async () => {
    const [data] = await connection.execute("SELECT p.product_name,p.price,p.description,p.discount,p.stock,p.image_url,p.status,c.category_name FROM products p, categories c WHERE p.category_id = c.id")
    return data
}

const updateProduct = async () => {

}

export default { createProduct, getAllProduct }