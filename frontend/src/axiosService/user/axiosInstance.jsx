import axios from 'axios';

// Tạo instance axios với cấu hình chung cho tất cả các yêu cầu
const axiosInstance = axios.create({
  
  baseURL: 'http://localhost:3001/',  // Thay URL API của bạn ở đây
  timeout: 10000,  // Thời gian timeout cho yêu cầu
});

// Request interceptor - tự động thêm access token vào header
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // Kiểm tra nếu lỗi là do hết hạn token (401)
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await axios.post('{http://localhost:3001/user/refreshToken}', { refreshToken });
          const newAccessToken = response.data.accessToken;

          // Cập nhật lại accessToken trong localStorage
          localStorage.setItem('accessToken', newAccessToken);

          // Cập nhật lại header của yêu cầu và thử lại yêu cầu ban đầu
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          // Nếu refresh token bị lỗi, xử lý logout hoặc thông báo lỗi
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';  // Điều hướng đến trang đăng nhập
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
