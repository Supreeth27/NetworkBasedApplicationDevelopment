var express = require('express');
var router = express.Router();
var itemDb = require('../utility/ItemDB');
/* GET home page. */
router.get('/',  function(req, res) {
  res.render('index');
});
router.get('/categories/catalog', function(req, res) {
    var categories = getCategories();
    var itemData = itemDb.getItems();
    var data= {
        categories: categories,
        items: itemData
    }
    res.render('categories', { data: data });
});
router.get('/contact', function(req, res) {
    res.render('contact');
});
router.get('/about', function(req, res) {
    res.render('about');
});
router.get('/categories/item/:itemCode', function(req, res) {
    var itemCode = req.params.itemCode;
    console.log("Item Code:"+itemCode);
    var item = itemDb.getItem(itemCode);
    if(item == null){
        console.log(item);
        var categories = getCategories();
        var itemData = itemDb.getItems();
        var data= {
            categories: categories,
            items: itemData
        }
        res.redirect('/categories/catalog');
    }
    else{
        var data= {
            item: item
        }
    }
    res.render('item', { data: data});
});
router.get('/categories/item/:itemCode', function(req, res) {

    var itemCode = req.params.itemCode;
    console.log("Item Code:"+itemCode);
    var item = itemDb.getItem(itemCode);
    console.log(item);
    var data= {
        item: item
    }
    res.render('item', { data: data});
});
router.get('/myitems', function(req, res) {
    res.render('myitems');
});

router.get('/feedback', function(req, res){
    var itemCode = 1;
    var item = itemDb.getItem(itemCode);
    var data= {
        item: item
    }
    res.render('feedback', { data: data});
});

router.get('/*', function(req, res){
    res.redirect('/categories/catalog');
});

var categories = [];
let getCategories = function() {
    // get the category of each item
    var data = itemDb.getItems();
    data.forEach(function (item) {
        if(!categories.includes(item.catalogCategory)){
            categories.push(item.catalogCategory);
        }
        
    });
    return categories;
};
module.exports = router;
njk