import connection from "../DB/connectDB";

const createCategory = async ({ category_name, description }) => {
    try {
        const [result] = await connection.execute(`INSERT INTO categories(category_name, description) VALUES(?, ?)`, [category_name, description])
        return result
    }
    catch (error) {
        console.log('lỗi gì đó không biết: ', error);
        throw error;
    }
}
export default {
    createCategory
}