var express=require('express')
var app=express();
var router = express.Router();

var bodyParser= require('body-parser');
var urlencodedParser= bodyParser.urlencoded({extended:false});
var UserDB = require('../Utility/UserDB.js');
var UserProfile=UserDB.UserProfile;
var itemDB=require('../Utility/itemDB')
var up = require('../models/UserProfile');
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

var items=itemDB.getItems();
var listofitems=itemDB.getItems();
var Users=UserDB.getUsers(UserDB.Users);
var getUserProfile=UserDB.getUserProfile;

var theUser=function(req,res,next){
  req.session.listofitems=listofitems;
  req.session.save();
  next()
}

router.use(theUser);

router.get('/',  function(req, res) {
    res.render('index',{start:[]});
});

router.get('/categories/catalog', function(req, res) {
    var categories = getCategories();
    var itemData = itemDB.getItems();
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
    var item = itemDB.getItem(itemCode);
    if(item == null){
        console.log(item);
        var categories = getCategories();
        var itemData = itemDB.getItems();
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

router.get('/myitems',function(req,res,next){

    if(req.session.theUser==undefined){
        req.session.theUser= Users[0];
        var UserID = req.session.theUser.UserID;
        var userProfile= getUserProfile(UserID);
        req.session.userProfile = userProfile;
      //var items=req.session.currentProfile.UserItems;
        var items = userProfile.getItems();
        req.session.userProfile.items = items;
        req.session.save();
        //console.log('kvdxnvdklljkn');
        if (items.length==0)
        {
            //console.log('fjsjkfsjdj');
            res.render('myitems',{items:[],firstname:req.session.theUser.FirstName})
        }
        else{
            // console.log('jsfjkl');
            // console.log(items.length);
            // console.log(items[0].item.itemName);
            // console.log(items[0].item.catalogCategory);
            // console.log(items[0].rating);
            // console.log(items[0].yourItem);
            res.render('myitems',{items:items,firstname:req.session.theUser.FirstName});
        }
    }
    else{
        var UserID = req.session.theUser.UserID;
        var userProfile= getUserProfile(UserID);
        req.session.userProfile = userProfile;
        //var items=req.session.currentProfile.UserItems
        var items = userProfile.getItems();
        req.session.userProfile.items = items;
        req.session.save();
        //console.log('neseflklv');
        if (items.length==0)
        {
            //console.log('jlskdjlk');
            res.render('myitems',{items:[],firstname:req.session.theUser.FirstName})
        }
        else{
            //console.log('jksfdkljo;jil;k');
            res.render('myitems',{items:items,firstname:req.session.theUser.FirstName});
        }
    }
});

router.get('/signin', function(req,res,next){
    if(req.session.theUser == undefined){
        req.session.theUser = Users[0]
        var UserId= req.session.theUser.UserId;
        var userProfile=getUserProfile(UserId);
        req.session.userProfile = userProfile;
        req.session.save();
        //console.log('nlfskndj');
    //console.log('jsvnjdk');
    res.render('index',{start:[1],firstname:req.session.theUser.FirstName})
    }
    else{
        //console.log('svjlfssf');
        //console.log(req.session.theUser);
        res.send('dfjfdjkdfjglkd');
    }
});

router.get('/signout',function(req,res,next){
    req.session.destroy();
    console.log('session ended');
    console.log(req.session);
    res.render('index',{start:[]})
});


router.post('/*',urlencodedParser,function(req,res,next){

    var itemcodeobj=req.session.listofitems;
    //var theItem=req.query.theItem;
    //console.log('bhjkhvjgkhklj'+ theItem);
    //if(itemcodeobj.includes(theItem)){
        var action=req.body.action;
        console.log('requested action: '+action);
        if(action=='save'||action=='updateProfile'||action=='updateRating'||action=='updateFlag'||action=='deleteItem'){
            var itemcode= req.body.itemList;
            if(action=='signout'){
                req.session.destroy();
                console.log('session ended');
                res.render('index',{start:[]});
            }
            else if(action=='save'||action=='updateProfile'||action=='updateRating'||action=='updateFlag'){
                var itemcode= req.body.itemList;
                if(itemcode.length > 0){
                    if(itemcodeobj.includes(itemcode)){
                        if(action == 'save'){
                            flag = 0;
                            for(var i=0;i<req.session.userProfile.UserItems.length;i++){
                                if(req.session.userProfile.UserItems[i].item.itemCode==itemcode){
                                    flag =  1;
                                }
                            }
                            if(!flag){
                                userProfile.add(new UserItem(getItem(itemcode),0,'false'));
                                req.session.userProfile = userProfile;
                                req.session.save();
                                res.render('myitems',{Items: req.session.userProfile.UserItems, firstname: req.session.theUser.FirstName})
                            }
                            else{
                                res.send('Item is already in the profile');
                            }
                        }
                        else if(action == 'updateProfile'){
                            flag = 0;
                            for(var i=0;i<req.session.userProfile.UserItems.length;i++){
                                if(req.session.userProfile.UserItems[i].item.itemCode==itemcode){
                                    var theItem = req.session.userProfile.UserItems[i];
                                    req.session.theItem = theItem;
                                    flag = 1;
                                    res.render('feedback');
                                }
                            }
                            if(flag){
                                res.render('myItems');
                            }    
                        }    
                        else if(action == 'updateRating'){
                            for(var i=0;i<req.session.userProfile.UserItems.length;i++){
                                if(req.session.userProfile.UserItems[i].item.itemCode==itemcode){
                                    var upRating = req.session.userProfile.UserItems[i].rating;
                                    var currentRating = getItem(itemCode).rating;
                                    flag = 0;
                                    if(upRating > 5 || upRating < 0){
                                        res.send('invalid rating');
                                        flag = 1;
                                    }
                                    if(!flag){
                                        if(upRating == 0){
                                            req.session.userProfile.UserItems[i].rating == undefined;
                                        }
                                        if(upRating == currentRating){
                                            res.send('no need to update');
                                        }
                                        else{
                                            req.session.userProfile.UserItems[i].rating = upRating;
                                            res.render('myitems',{items: req.session.userProfile.UserItems});
                                        }
                                    }
                                }
                            }
                        }
                        else if(action == 'updateFlag'){

                        }
                        else if(action == 'deleteItem'){
                            //var profileItems = req.session.userProfile.UserItems;
                            var profileItems=[];
                            for (i=0;i<req.session.userProfile.UserItems.length;i++){
                                profileItems.push(req.session.userProfile.UserItems[i].item.itemCode);
                            }
                            if(profileItems.includes(itemcode)){
                                req.session.userProfile.UserItems.splice(req.session.userProfile.UserItems,1);
                            }
                            //var item = getItem(itemcode);
                            //up.removeItem(item);
                            res.render('myitems',{items:req.session.userProfile.UserItems});
                        }
                    }
                }
                else{
                    res.render('myitems',{items:useritems});
                }
            }
        }
        else{
            res.render('myitems',{items:items})
            console.log('requested action cannot be Processed at this time')
        }
    // }
    // else{
    //   res.send('There are no items in profile to view');
    // }
});

router.get('/feedback', function(req, res){
    var itemCode = 1;
    var item = itemDB.getItem(itemCode);
    var data= {
        item: item
    }
    res.render('feedback', { data: data});
});

var categories = [];
let getCategories = function() {
    // get the category of each item
    var data = itemDB.getItems();
    data.forEach(function (item) {
        if(!categories.includes(item.catalogCategory)){
            categories.push(item.catalogCategory);
        }
        
    });
    return categories;
};

module.exports = router;