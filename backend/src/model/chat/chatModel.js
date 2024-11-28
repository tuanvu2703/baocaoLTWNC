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
            "SELECT * FROM messenger WHERE (iduser = ? OR iduser = ?) AND idrom = ? ORDER BY dateCreate ASC",
            [iduser, idadmin, iduser]
        );
        
        return result;
    } catch (error) {
        console.error('Failed to get chat:', error.message);
        throw error;
    }
};

const getAllUserNotRep = async () => {
    try {
        const [result] = await connection.query(
            "SELECT m.iduser, GROUP_CONCAT(m.mess ORDER BY m.dateCreate ASC) AS mess, u.fullname, u.username, u.email FROM messenger m JOIN users u ON m.iduser = u.id WHERE (m.status='true') AND m.see = 0 GROUP BY m.iduser, u.fullname, u.username, u.email ORDER BY m.dateCreate ASC;"
        );
        return result;
    } catch (error) {
        console.error('Failed to get list of user ids that did not reply to chat:', error.message);
        throw error;
    }

    
};
// SELECT 
//     m.iduser, 
//     GROUP_CONCAT(m.mess ORDER BY m.dateCreate ASC) AS mess, 
//     u.fullname, 
//     u.username, 
//     u.email
// FROM messenger m
// JOIN users u ON m.iduser = u.id
// WHERE m.role = 1
// AND m.see = 0
// GROUP BY m.iduser, u.fullname, u.username, u.email
// ORDER BY m.dateCreate ASC;
const updateSeeMess = async (id) => {
    try {
        const [result] = await connection.query(
            "UPDATE messenger SET see = 1 WHERE id = ?;",
            [id]
        );
        return result;
    } catch (error) {
        console.error('Failed to update:', error.message);
        throw error;
    }
};
const updateStatusMess = async (idUser) => {
    try {
        const [result] = await connection.query(
            "UPDATE messenger SET status ='false' WHERE iduser = ?;",
            [idUser]
        );
        return result;
    } catch (error) {
        console.error('Failed to update:', error.message);
        throw error;
    }
};
const getProfileUserById = async (id) => {
    try {
        const [result] = await connection.query(
            "SELECT username, fullname, avatar,email FROM users WHERE id=?",
            [id]
        );
        return result[0];
    } catch (error) {
        console.error('Failed to get user by id:', error.message);
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
    getAllUserNotRep,
    getProfileUserById,
    updateSeeMess,
    updateStatusMess,
};
