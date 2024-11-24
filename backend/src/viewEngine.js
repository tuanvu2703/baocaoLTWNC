const viewEngine = (app) => {
    try {
      app.set("view engine", "ejs"); 
      app.set("views", "./src/views"); 
    } catch (error) {
      console.error(" engine lỗi không tồn tại file, lỗi j đó phúc hông biết:", error.message);
    }
  };
  
  export default viewEngine;
  