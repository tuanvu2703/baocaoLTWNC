import categoryModel from "../../model/categoryModel";
import productModel from "../../model/productModel";

const createCategory = async (req, res) => {
    try {
        const { category_name, description } = req.body;
        await categoryModel.createCategory(category_name, description)
        res.status(200).json({
            message: 'create seccesfully',
            data: req.body
        })
    }
    catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
const getCategoryPage = async (req, res) => {
    ;
    try {
        const listCategories = await categoryModel.getAllCategory();
        res.status(200).json({
            listCategories
        })
    }
    catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const updateCategory = async (req, res) => {
    try {
        const { category_name, description, id } = req.body;
        const result = await categoryModel.updateCategory(category_name, description, id);
        res.status(200).json({ message: 'update seccesfully', data: req.body })
        console.log(result);
        // res.redirect("/category");
    }
    catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteCategory = (req, res) => {
    const id = req.params.id;
    categoryModel.deleteCategory(id)
        .then(() => {
            res.status(200).json({ message: 'delete seccesfully' })
        })
        .catch(() => {
            res.status(403).json({
                message: 'Unable to delete.'
            })
        })

}

const searchCategorybyname = async (req, res) => {
    try {
        const { category_name } = req.params.category_name;
        const result = await categoryModel.searchCategorybyname(category_name);
        res.status(200).json({ message: 'search seccesfully', result })
    }
    catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}



export default {
    createCategory,
    getCategoryPage,
    updateCategory,
    searchCategorybyname,
    deleteCategory
}