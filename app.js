const express = require("express");
const app = express();
const ejs = require("ejs");
const connection = require("./database/database");
const categoriesController = require('./categories/CategoriesController');
const articleController = require('./articles/ArticlesController');
const Article = require("./articles/Article");
const Category = require("./categories/Category");

app.set('view engine', 'ejs');
app.use(express.static('public'));
//parser do express
app.use(express.json());
app.use(express.urlencoded());



connection.authenticate() 
    .then(() => {
        console.log("Conexão feita com o banco de dados!") 
    })
    .catch((error) => {
        console.log(error);
    }) 

app.use("/", categoriesController, articleController);

app.get("/", (req,res) =>{
    res.render("index");
}) 

app.listen(8000, console.log("App rodando!"))
