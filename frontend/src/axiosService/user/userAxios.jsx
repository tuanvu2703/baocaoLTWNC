// src/axios.js
import axios from 'axios';


const API_URL = 'http://localhost:3001/user'; 

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


const handleLogout = async (navigate) => {
    try {
        // Xóa token và user khỏi localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        // Điều hướng về trang đăng nhập
        navigate("/");
        window.location.reload()
    } catch (error) {
        console.error("Logout failed:", error);
    }
};

const changePassword = async (oldPassword, newPassword) => {
    const token = localStorage.getItem('token');  // Lấy token từ localStorage
    if (!token) {
      throw new Error('User not logged in');
    }
  
    try {
      const response = await axiosInstance.post('/updatepassword', 
        { oldPassword, newPassword }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data; // Trả về dữ liệu phản hồi từ server
    } catch (error) {
      throw error.response ? error.response.data : error.message; // Xử lý lỗi từ server
    }
  };

// Gửi yêu cầu OTP để reset mật khẩu
const requestOtpResetPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/requestOTP`, { email });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Something went wrong';
  }
};

// Xác nhận OTP và thay đổi mật khẩu
 const verifyOtpResetPassword = async (email, otp, password) => {
  try {
    const response = await axios.post(`${API_URL}/verifyOTPResetPassword`, { email, otp, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Something went wrong';
  }
};

 const verifyOtpApi = async (email, otp) => {
  try {
    const response = await axios.post(`${API_URL}/verifyOTP`, { email, otp });
    return response.data;
  } catch (err) {
    throw err;
  }
};

 const resetPasswordApi = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/resetPassword`, { email, password });
    return response.data;
  } catch (err) {
    throw err;
  }
};


 const getCurrentUser = async (token) => {
    return axios.get(`${API_URL}/currentUser`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };
  
   const updateUser = async (token, userData) => {
    return axios.put(`${API_URL}/updateuser`, userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };
  
   const uploadAvatar = async (token, formData) => {
    return axios.post(`${API_URL}/uploadavatar`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  };

const resetPasswordWithOtp = async (email, otp, password) => {
    try {
      const response = await axios.post(`${API_URL}/verifyOTPResetPassword`, {
        email,
        otp,
        password,
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  };

export { 
    handleLogout,
    requestOtpResetPassword,
    verifyOtpResetPassword,
    resetPasswordWithOtp,
    verifyOtpApi,
    resetPasswordApi,
    uploadAvatar,
    getCurrentUser,
    updateUser,
    changePassword,
 };
