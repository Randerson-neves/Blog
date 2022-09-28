const express = require("express");
const router = express.Router();
const Category = require('../categories/Category');
const Article = require('./Article');
const slugify = require('slugify');

router.get("/admin/articles", (req, res) =>{
    Article.findAll({raw: true, where:{isActive: 1}, order:
        [['id', 'ASC']]}).then( articles =>{
            res.render("admin/articles/index", {
                articles:articles
        });
    })
}) 

router.get("/admin/articles/new", (req, res) =>{
    Category.findAll({where:{isActive: 1}}).then( categories => {
        res.render("admin/articles/new", {categories:categories});

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
})

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
})

module.exports = router;