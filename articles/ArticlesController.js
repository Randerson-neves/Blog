const express = require("express");
const router = express.Router();
const Category = require('../categories/Category');
const Article = require('./Article');
const slugify = require('slugify');

router.get("/admin/articles", (req, res) =>{
    res.render("admin/articles/index")
})

router.get("/admin/articles/new", (req, res) =>{
    Category.findAll({where:{isActive: 1}}).then( categories => {
        res.render("admin/articles/new", {categories:categories});

    })
})

router.post("/articles/save", (req,res) =>{
    let {title, body, category} = req.body
    console.log(req.body.category)
    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }).then(() =>{
        res.redirect("/admin/articles")
    }).catch((err) =>{
        console.log(err);
    })
})

module.exports = router;