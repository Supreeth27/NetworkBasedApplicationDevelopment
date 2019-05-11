
var express= require('express');
var app = express();
var allItems = require('./Utility/ItemDB');
//var l= require('/Utility/itemDB.js');
var db=require('./Utility/itemDB.js');
//var allItems = require('/Utility/UserDB.js');
var allUsers= require('./Utility/UserDB.js');
var itemDB=require('./Utility/itemDB')

var session=require('express-session')
app.use(session({
    secret:"supreeth",
    resave: false,
    saveUninitialized: true
}));

app.set('view engine', 'ejs');

app.use('/assets', express.static('assets'));

var ProfileController = require('./routes/ProfileController.js');
//var catalogController = require('./routes/CatalogController.js');


app.use('/', ProfileController);
app.use('/categories/catalog',ProfileController);
app.use('/about', ProfileController);
app.use('/contact', ProfileController);

app.use('/signin',ProfileController);

app.get('/item', function(req,res){

    var itemCode=req.query.itemCode;
    var cd=[]
    for(i=0;i<l.allItems.length;i++){
        cd.push(l.allItems[i].itemCode);
    }
    if(cd.includes(itemCode)){
        for(i=0;i<l.allItems.length;i++){
            if(itemCode==l.allItems[i].itemCode){
                var info={itemCode:l.allItems[i].itemCode,
                    imageUrl:l.allItems[i].itemName,
                    itemName:l.allItems[i].catalogCategory,
                    description1:l.allItems[i].description,
                    description2:l.allItems[i].imageUrl}
                res.render('item',{info:info,start:[1]});
            }
        }
    }
    else {
        var  cc=db.allItems;
        res.render('categories',{cc});
    }
});

app.get('/myitems', ProfileController);

app.use(function(req,res,next ){
  res.status(404).send("Please enter the valid URL.You can try appending /home")
});

app.listen(8080,function(){
    console.log('app started')
    console.log('listening on port 8080')
});

