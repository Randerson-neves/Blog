const express = require("express");
const router = express.Router();
const Category = require('../categories/Category');
const Article = require('./Article');
const slugify = require('slugify');

router.get("/admin/articles", (req, res) =>{
    Article.findAll({
        include:[{model: Category}],
        where:{isActive: 1}, 
        order:[['id', 'ASC']]})
        .then( articles =>{
            res.render("admin/articles/index", {
                articles:articles
        });
    })
}); 

router.get("/admin/articles/new", (req, res) =>{
    Category.findAll({
        where:{isActive: 1}
    }).then( 
        categories => {
        res.render("admin/articles/new", {categories:categories});
    })
});

router.get("/user/:id", (req,res) =>{
    var id = req.params.id;
    Article.findOne({
        where:{id:id}
    }).then(article => {
        article != undefined ? res.render("user/article.ejs", {article:article}) : res.redirect("/");
    }).catch( err =>{
        console.log(err);
        res.redirect("/");
    })
})

router.get("/user/articles/:id", (req,res) =>{
    var selectedCategory = req.params.id
    Article.findAll({
        where: [{categoryId: selectedCategory},
        {isActive: 1}]
    }).then(articles => {
            res.render("user/articleByCategorie.ejs", {articles:articles}); 
    }).catch(err =>{
        console.log(err);
        res.redirect("/")
    })
})

router.post("/articles/save", (req,res) =>{
    let {title, resume, body, category} = req.body
    Article.create({
        title: title,
        slug: slugify(title),
        resume: resume,
        body: body,
        categoryId: category,
        isActive: 1
    }).then(() =>{
        res.redirect("/admin/articles")
    }).catch((err) =>{
        console.log(err);
    })
});

router.post("/articles/delete", (req,res) => {
    let id = req.body.id; 
    Article.update(
        {isActive: 0},
        {where:{id:id}}
    ).then(() =>{ 
        res.redirect('/admin/articles');
    }).catch((err) =>{
        console.log(err)
    })
});

module.exports = router;