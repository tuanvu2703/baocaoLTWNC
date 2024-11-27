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