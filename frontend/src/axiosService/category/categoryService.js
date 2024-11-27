
import axios from 'axios';
export async function getAllCategory() {
    try {
        var request = await axios.get(`http://localhost:3001/api/category`)
        return request.data.listCategories
    } catch (error) {
        return (error)
    }
}
