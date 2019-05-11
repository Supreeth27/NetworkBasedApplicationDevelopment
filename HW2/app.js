
var express = require('express');
var app = express();

// view engine setup
app.set('view engine', 'ejs');

//set the path for static resources to be accessible
app.use('/assets', express.static('assets'));

var catalogController = require('./routes/CatalogController.js');

//  routes defining
app.use('/', catalogController);
app.use('/myitems', catalogController);
app.use('/categories/catalog',catalogController);
app.use('/categories/item/:itemCode',catalogController);
// app.use('/')
app.use('/contact', catalogController);
app.use('/about', catalogController);

app.listen(8080,function(){
    console.log('app started')
    console.log('listening on port 8080')
});

module.exports = app;