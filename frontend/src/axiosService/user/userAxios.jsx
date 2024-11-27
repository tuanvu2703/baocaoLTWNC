// src/axios.js

export const handleLogout = async (navigate) => {
    try {
        // Xóa token khỏi localStorage
        localStorage.removeItem("token");
        // Chuyển hướng về trang đăng nhập
        navigate("/");
    } catch (error) {
        console.error("Logout failed:", error);
        // Có thể thêm thông báo lỗi cho người dùng nếu cần
    }
};
