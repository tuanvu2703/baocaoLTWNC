import axios from "axios";

 const handleLogout = async (navigate) => {
    try {
        // Gửi yêu cầu đến API logout
        await axios.post("http://localhost:3001/auth/logout", null, {
            headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        });

        // Xóa token khỏi localStorage
        localStorage.removeItem("accessToken");

        // Chuyển hướng về trang đăng nhập
        navigate("/");
    } catch (error) {
        console.error("Logout failed:", error);
        // Có thể thêm thông báo lỗi cho người dùng nếu cần
    }
};

export { handleLogout };
