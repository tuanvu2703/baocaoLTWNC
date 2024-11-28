import axios from 'axios';

const apiUrl = 'http://localhost:3001/cart';

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

const redirectToLogin = () => {
  const currentPath = window.location.pathname + window.location.search;
  localStorage.setItem('redirectAfterLogin', currentPath);
  window.location.href = '/login'; // Chuyển hướng tới trang login
};

const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

export const addCart = (data) => {
  if (!isLoggedIn()) {
    redirectToLogin();
    return Promise.reject(new Error('User not logged in'));
  }
  return axiosInstance.post('/addcart', data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
};

export const getCart = () => {
  if (!isLoggedIn()) {
    redirectToLogin();
    return Promise.reject(new Error('User not logged in'));
  }
  return axiosInstance.get('/getcart', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
};

export const deleteCart = (productId) => {
  if (!isLoggedIn()) {
    redirectToLogin();
    return Promise.reject(new Error('User not logged in'));
  }
  return axiosInstance.delete('/deletecart', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    data: { productId },
  });
};

export const clearCart = () => {
  if (!isLoggedIn()) {
    redirectToLogin();
    return Promise.reject(new Error('User not logged in'));
  }
  return axiosInstance.delete('/clearcart', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
};

export const updateCart = (data) => {
  if (!isLoggedIn()) {
    redirectToLogin();
    return Promise.reject(new Error('User not logged in'));
  }
  return axiosInstance.put('/updatecart', data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
};
