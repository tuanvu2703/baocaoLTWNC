import axios from 'axios';

const getAllChat = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No access token found in localStorage");
            return null;  
        }
        const response = await axios.get("http://localhost:3001/api/chat", {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data && response.data.success) {
            return response.data;
        } else {
            console.error("Failed to get chat:", response.data.message);
            return { success: false, message: "Failed to get chat" };
        }
    } catch (error) {
        return (error)
    }
};
const postChat  = async (data)=>{
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No access token found in localStorage");
            return null;  
        }
        const response = await axios.post("http://localhost:3001/api/chat", data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("failed postChat:",error);
        return { success: false, message: "post chat fail" };
    }
}
export default{
    getAllChat,
    postChat,
}