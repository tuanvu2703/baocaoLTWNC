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

const updateProduct = async (product_name, description, price, discount, stock, image_url, category_id, product_id) => {
    try {
        const [result] = await connection.execute(`UPDATE products SET product_name = ?, description = ?, price = ?, discount = ?, stock = ?, image_url = ?, category_id = ? WHERE product_id = ?`, [product_name, description, price, discount, stock, image_url, category_id, product_id]);
        return result
    }
    catch (error) {
        console.log('lỗi gì đó không biết: ', error);
        throw error;
    }
}

const searchProductbyname = async (product_name) => {
    const [result] = await connection.execute(`SELECT * FROM products WHERE LOWER(product_name) LIKE LOWER(?)`, [`%${product_name}%`])
    return result
}

export default { createProduct, getAllProduct, updateProduct, searchProductbyname }