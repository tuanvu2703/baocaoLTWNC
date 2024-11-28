import connection from "../DB/connectDB";

const createCategory = async (category_name, description) => {
        const result = await connection.execute(`INSERT INTO categories(category_name, description) VALUES(?, ?)`, [category_name, description])
        return result
}
const getAllCategory = async () => {
        const [result] = await connection.execute(`SELECT c.*, COUNT(p.product_id) AS total_products FROM categories c LEFT JOIN products p ON c.id = p.category_id GROUP BY c.category_name ORDER BY c.id ASC`)
        return result

}

const updateCategory = async (category_name, description, id) => {
        const [result] = await connection.execute(`UPDATE categories SET category_name = ?, description = ? WHERE id = ?`, [category_name, description, id]);
        return result
}

const searchCategorybyname = async (category_name) => {
        const [result] = await connection.execute(`SELECT c.*, COUNT(p.product_id) AS total_products FROM categories c LEFT JOIN products p ON c.id = p.category_id WHERE LOWER(category_name) LIKE LOWER(?)`, [`%${category_name}%`])
        return result
}

const deleteCategory = async (id) => {
        const result = await connection.execute("DELETE FROM categories WHERE id = ?", [id])
        return result
}

const findCategoryByID = async (id) => {
        const [result] = await connection.execute("SELECT * FROM categories WHERE id = ?", [id])
        return result[0]
}
const getNameCategory = async (id) => {
        const [rows] = await connection.execute("SELECT category_name FROM categories WHERE id = ?", [id]);
        return rows.length > 0 ? rows[0].category_name : null;
};
export default {
        createCategory,
        getAllCategory,
        updateCategory,
        searchCategorybyname,
        deleteCategory,
        findCategoryByID,
        getNameCategory
}