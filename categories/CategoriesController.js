const express = require("express");
const router = express.Router();
const Category = require('./Category');
const slugify = require('slugify')

router.get("/admin/categories/new", (req, res) =>{
    res.render('admin/categories/new')
})

router.get("/admin/categories", (req,res) =>{

    Category.findAll({raw: true, where:{isActive: 1}, order: 
    [['id', 'ASC']]}).then(category =>{
        res.render('admin/categories/index', {
            category:category
        })
    })
    
})

router.post("/categories/save", (req,res) => {
    let title = req.body.title;
    if(title != undefined){
        Category.create({
            title: title,
            slug: slugify(title),
            isActive: 1
        }).then (() =>{
            res.redirect("/admin/categories")
        })
    } else{
        res.redirect("/admin/categories/new")
    }
})

router.post("/categories/delete", (req,res) => {
    let id = req.body.id;
    Category.update(
        {isActive: 0},
        {where:{id:id}}
    ).then(() =>{ 
        res.redirect('/admin/categories');
    }).catch((err) =>{
        console.log(err)
    })
})

router.post("/categories/edit", (req,res) => {
    let {id, title} = req.body;
    Category.update(
        {title: title, 
        slug: slugify(title)},
        {where:{id:id}}
    ).then(() =>{ 
        console.log(id)
        res.redirect('/admin/categories');
    }).catch((err) =>{
        console.log(err)
    })
})

module.exports = router;