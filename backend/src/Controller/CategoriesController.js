import categoryModel from '../model/categoryModel';

const createCategory = async (req, res) => {
    if (req.method === "GET") {
        res.render('index',
            {
                title: "Create Category",
                page: "createCategory"
            }
        )
    }
    if (req.method === "POST") {
        const { category_name, description } = req.body
        const result = await categoryModel.createCategory(category_name, description)
        //alert
        req.session.message = "Category created successfully!";
        res.redirect("/category");
    }
}
const getCategoryPage = async (req, res) => {
    const listCategories = await categoryModel.getAllCategory();
    res.render("index",
        {
            title: 'Danh mục',
            page: 'categories',
            data: listCategories,

        }
    )
}

const updateCategory = async (req, res) => {
    if (req.method === "GET") {
        const id = req.params.id;
        const oneIdCategory = await categoryModel.findCategoryByID(id);
        res.render('index',
            {
                title: "Update Category",
                page: "updateCategory",
                data: oneIdCategory
            }
        )
    }
    if (req.method === "POST") {
        const id = req.params.id
        const { category_name, description } = req.body
        console.log(req.body)
        const result = await categoryModel.updateCategory(category_name, description, id)
        //alert
        req.session.message = "Category updated successfully!";
        res.redirect("/category");
    }
}

const deleteCategory = async (req, res) => {
    // if (req.method === "POST") {
    const id = req.params.id;
    await categoryModel.deleteCategory(id)
        .then(() => { req.session.message = `Category deleted successfully!` })
        .catch(() => { req.session.message = `This category cannot be deleted` }
        )
    res.redirect("/category");
    // }
}

const searchCategoryByName = async (req, res) => {
    const { category_name } = req.query;
    const result = await categoryModel.searchCategorybyname(category_name);
    res.render("index", {
        title: 'Search Results',
        page: 'categories',
        data: result,
    });
};

export default {
    createCategory,
    getCategoryPage,
    updateCategory,
    searchCategoryByName,
    deleteCategory
}