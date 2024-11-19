const viewEngine = (app) => {
    app.set("view engine", "ejs")
    app.set("View", "./View/")
}
export default viewEngine