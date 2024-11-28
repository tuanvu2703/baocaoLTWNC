import connection from "../../DB/connectDB";
const addChat = async (data) => {
    const { iduser, status, mess, pinproduct, see, repdatetime, role, idrom } = data;
    const dateCreate = new Date().toISOString().slice(0, 19).replace('T', ' '); // YYYY-MM-DD HH:mm:ss
    try {
        const [result] = await connection.query(
            "INSERT INTO messenger (iduser, status, datecreate, mess, pinproduct, see, repdatetime, role, idrom) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [iduser, status, dateCreate, mess, pinproduct, see, repdatetime, role, idrom]
        );
        return result;
    } catch (error) {
        console.error('Failed to add chat:', error.message);
        throw error;
    }
};
const getChatAdmin = async (iduser, idadmin) => {
    try {
        const [result] = await connection.query(
            "SELECT * FROM messenger WHERE (iduser = ? OR iduser = ?) AND idroom = ? ORDER BY dateCreate ASC",
            [iduser, idadmin, iduser]
        );
        return result;
    } catch (error) {
        console.error('Failed to get chat:', error.message);
        throw error;
    }
};
const getChatUser = async (iduser) => {
    try {
        const [result] = await connection.query(
            "SELECT * FROM messenger WHERE idrom = ?  ORDER BY dateCreate ASC",
            [iduser]
        );
        return result;
    } catch (error) {
        console.error('Failed to get chat:', error.message);
        throw error;
    }
};

export default {
    addChat,
    getChatAdmin,
    getChatUser,
};
