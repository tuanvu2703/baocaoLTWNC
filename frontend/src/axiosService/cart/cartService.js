import axios from 'axios';

const apiUrl = 'http://localhost:3001/cart'; 

const token = localStorage.getItem('token'); 

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: token ? `Bearer ${token}` : '', 
    'Content-Type': 'application/json',
  },
});


export const addCart = (data) => {
  return axiosInstance.post('/addcart', data);
};


export const getCart = () => {
  return axiosInstance.get('/getcart');
};


export const deleteCart = (productId) => {
  return axiosInstance.delete('/deletecart', {
    data: { productId }, 
  });
};


export const clearCart = () => {
  return axiosInstance.delete('/clearcart');
};


export const updateCart = (data) => {
  return axiosInstance.put('/updatecart', data);
};
