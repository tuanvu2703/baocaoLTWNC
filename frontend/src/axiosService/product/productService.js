import axios from "axios";

export async function getAllProduct() {
    try {
        var request = await axios.get(`http://localhost:3001/api/product`)
        return request.data.listproduct
    }
    catch (error) {
        return error
    }
}

export async function searchProduct(params) {
    try {
        var request = await axios.get(`http://localhost:3001/api/product/search/${params}`)
        return request.data.result
    }
    catch (error) {
        return error
    }
}


export async function detailProduct(params) {
    try {
        var request = await axios.get(`http://localhost:3001/api/product/${params}`)
        return request.data.data;
    }
    catch (error) {
        return error
    }
}

export async function productByCategory(params) {
    try {
        var request = await axios.get(`http://localhost:3001/api/product/category/${params}`)
        return request.data.data
    }
    catch (error) {
        return error
    }
}