import connection from "../DB/connectDB";

const createCategory = async (category_name, description) => {
    try {
        const [result] = await connection.execute(`INSERT INTO categories(category_name, description) VALUES(?, ?)`, [category_name, description])
        return result
    }
    catch (error) {
        console.log('lỗi gì đó không biết: ', error);
        throw error;
    }
}
const getAllCategory = async () => {
    const [data] = await connection.execute(`SELECT c.*, COUNT(p.product_id) AS total_products FROM categories c LEFT JOIN products p ON c.id = p.category_id GROUP BY c.category_name`)
    return data
}

const updateCategory = async (category_name, description, id) => {
    const [result] = await connection.execute(`UPDATE categories SET category_name = ?, description = ? WHERE id = ?`, [category_name, description, id]);
    return result
}
export default {
    createCategory,
    getAllCategory,
    updateCategory
}