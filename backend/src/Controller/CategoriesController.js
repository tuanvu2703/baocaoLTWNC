import * as categoryModel from '../model/categoryModel';

const createCategory = async (req, res) => {
    try {
        const { category_name, description } = req.body;
        await categoryModel.createCategory(category_name, description)
        res.status(200).json({ message: 'create seccesfully', data: req.body })
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
const getCreateCategoryPage = (req, res) => {
    return res.render("index",
        {
            title: 'Danh mục',
            page: 'categories',
        }
    )
}

export default {
    createCategory,
    getCreateCategoryPage
}