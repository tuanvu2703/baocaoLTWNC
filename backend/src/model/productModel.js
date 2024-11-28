import connection from "../DB/connectDB";

const createProduct = async (product_name, description, price, discount, stock, image_url, category_id) => {
    const [result] = await connection.execute(`INSERT INTO products(product_name, description, price, discount, stock, image_url,category_id) VALUES(?, ?, ?, ?, ?, ?, ?)`, [product_name, description, price, discount, stock, image_url, category_id]);
    return result
}

const getAllProduct = async () => {
    const [data] = await connection.execute("SELECT p.product_id, p.product_name,p.price,p.description,p.discount,p.stock,p.image_url,p.status,c.category_name FROM products p, categories c WHERE p.category_id = c.id ORDER BY p.product_id ASC")
    return data
}

const updateProduct = async (product_name, description, price, discount, stock, image_url, category_id, product_id) => {

    const [result] = await connection.execute(`UPDATE products SET product_name = ?, description = ?, price = ?, discount = ?, stock = ?, image_url = ?, category_id = ? WHERE product_id = ?`, [product_name, description, price, discount, stock, image_url, category_id, product_id]);
    return result
}

const searchProductbyname = async (product_name) => {
    const [result] = await connection.execute(`SELECT p.product_id, p.product_name,p.price,p.description,p.discount,p.stock,p.image_url,p.status,c.category_name FROM products p, categories c WHERE p.category_id = c.id AND LOWER(product_name) LIKE LOWER(?)`, [`%${product_name}%`])
    return result
}

const deleteProduct = async (product_id) => {
    return await connection.execute("DELETE FROM products WHERE product_id = ?", [product_id])
}
const findproductByID = async (id) => {
    const [result] = await connection.execute("SELECT p.product_id, p.product_name,p.price,p.description,p.discount,p.stock,p.image_url,p.status,c.category_name FROM products p, categories c WHERE p.category_id = c.id AND product_id = ?", [id])
    return result
}
const findproductByCategory = async (category_id) => {
    const [result] = await connection.execute("SELECT p.product_id, p.product_name,p.price,p.description,p.discount,p.stock,p.image_url,p.status,c.category_name FROM products p, categories c WHERE p.category_id = c.id AND category_id = ?", [category_id])
    return result
}

export default { createProduct, getAllProduct, updateProduct, searchProductbyname, deleteProduct, findproductByID, findproductByCategory }