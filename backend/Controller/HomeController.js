const getHomePage = (req, res) => {
    return res.render("main",
        {
            title: 'Home website',
            page: 'home',
        }
    )
}
export default getHomePage