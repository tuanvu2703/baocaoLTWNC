const getHomePage = (req, res) => {
    return res.render("index",
        {
            title: 'Home website',
            page: 'home',
        }
    )
}
export default getHomePage