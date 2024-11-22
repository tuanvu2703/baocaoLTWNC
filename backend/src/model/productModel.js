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
    const [data, fields] = await connection.execute("SELECT * FROM `products`")
    return data
}

export default { createProduct, getAllProduct }