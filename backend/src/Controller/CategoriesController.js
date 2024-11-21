import categoryModel from "../model/categoryModel";

const createCategory = async (req, res) => {
    try {
        const { category_name, description } = req.body;
        await categoryModel.createCategory(category_name, description)
        res.status(200).json({ message: 'create seccesfully', data: req.body })
    } catch (error) {
        console.log('lỗi gì đó không biếc:', error);
    }
}


export default {
    createCategory
}