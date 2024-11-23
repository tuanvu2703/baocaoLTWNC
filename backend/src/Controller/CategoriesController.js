import categoryModel from '../model/categoryModel';

const createCategory = async (req, res) => {
    try {
        const { category_name, description } = req.body;
        await categoryModel.createCategory(category_name, description)
        res.status(200).json({ message: 'create seccesfully', data: req.body })
        // res.redirect("/category");
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
const getCategoryPage = async (req, res) => {
    const listCategories = await categoryModel.getAllCategory();
    return res.render("index",
        {
            title: 'Danh mục',
            page: 'categories',
            data: listCategories
        }
    )
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

const searchCategorybyname = async (req, res) => {
    try {
        const { category_name } = req.body;
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
    searchCategorybyname
}