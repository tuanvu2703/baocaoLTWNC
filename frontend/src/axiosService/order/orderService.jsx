import axios from 'axios';
import React, { useState, useEffect } from 'react';
const getProductById = async ({ idproduct }) => {
    try {
        const response = await axios.get(`http://localhost:3001/api/order/productShow/${idproduct}`);
        return response.data;
    } catch (error) {
        return (error)
    }
}
export default {
    getProductById,
}