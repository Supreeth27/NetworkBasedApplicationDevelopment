var express = require('express');
var router = express.Router();
var itemDb = require('../Utility/ItemDB');
var userDb = require('../Utility/UserDB');
var session = require('express-session');
//var users = userDb.getUsers();
//var userProfile = userDb.getUsersProfile();
var UserItem = require('../models/UserItem');
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({
  extended : false
});
var validator=require('express-validator');
router.use(validator());
const { check } = require('express-validator/check')

router.use(function(req, res, next){
  res.locals.fname = req.session.fname;
  next();
})



router.get('/',  function(req, res) {
  if(req.session.theUser){
    res.render('index',{userProfile : req.session.userProfile, name: req.session.theUser});
  }
  else{
    res.render('index', {userProfile : null,name: null});
  }
});

router.get('/myitems', function(req, res) {
console.log('jfekfljln')
if(req.session.theUser){
    
    console.log(req.session.userProfile)
  res.render('myitems', {userProfile : req.session.userProfile, name: req.session.theUser});
}
else {
  // var userName = req.query.uname;
  // var password = req.query.psw;
  // console.log(userName);
  // console.log(password);  
  userDb.getUsers().then(function(users){
    console.log('in loop');
    req.session.theUser = users[0];
    console.log('user defined');
    userDb.getUserProfile(req.session.theUser.userId).then(function(userProfile){
      console.log('creating session');
      req.session.userProfile = userProfile;
      req.session.fname = users[0].firstName;
      res.render('myitems', {userProfile: req.session.userProfile, name: req.session.theUser,fname:req.session.fname});
    })
  })
}
});

router.get('/signin', function (req, res) {
  if(req.session.theUser){
    console.log(req.session.userProfile)
    res.render('myitems', {userProfile : req.session.userProfile, name: req.session.theUser, flag: 0});
  }
  //res.redirect('/myitems');
  else{
    res.render('login', {userProfile : null, name: req.session.theUser, flag: 0});
  }
});

router.post('/signin',check('email').isEmail(),urlEncodedParser, function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  console.log("kjldfsj",email)
  console.log("jdfwjfdj",password)
      userDb.getUser(email,password).then(function(users){
        if(users){
            req.session.theUser = users
            userDb.getUserProfile(req.session.theUser.userId).then(function(userProfile){
                req.session.userProfile = userProfile;
                res.render('myitems',{userProfile:req.session.userProfile})
            });
        }
        else {
          res.render('login',{userProfile:null, flag:1});
        }
      });

  // var errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   console.log(errors.array());
  // } 
  // else {
  //   var email = req.body.email;
  //   var password = req.body.password;
  //   userDb.getUser(email,password).then(function(users){
  //     if(users){
  //       req.session.theUser = users
  //       userDb.getUserProfile(req.session.theUser.userId).then(function(userProfile){
  //         req.session.userProfile = userProfile;
  //         res.render('myitems',{userprofile:req.session.userProfile})
  //       });
  //     }
  //     else {
  //       res.render('login',{userprofile:null,flag:1});
  //     }
  //   });
  // }
});

router.get('/signout', function (req, res) {
req.session.destroy();
users = userDb.getUsers();
userProfile = userDb.getUsersProfile();
res.render('index', {userProfile : null, fname:undefined});
});

router.get('/categories/catalog', function(req, res) {
    var category = itemDb.category;
    //var itemData = itemDb.getItems();
    //console.log('jklfsdg')
    itemDb.getItems().then(function(itemdata){
      //console.log('jklfahjkh')
    if(req.session.theUser){
      res.render('categories', {itemData :itemdata, category : category, userProfile : req.session.userProfile, name: req.session.theUser });
    }
    else {
      //console.log('jgskligkjlf')
      res.render('categories', {itemData : itemdata, category : category, userProfile : null, name: null});
    }
  })
});

router.get('/contact', function(req, res) {
  if(req.session.theUser){
    res.render('contact', {userProfile : req.session.userProfile, name: req.session.theUser});
  }
  else {
    res.render('contact', {userProfile : null, name: null});
  }

});

router.get('/about', function(req, res) {
  if(req.session.theUser){
    res.render('about', {userProfile : req.session.userProfile, name: req.session.theUser})
  }else {
    res.render('about', {userProfile : null, name: null});
  }
    
});


router.get('/categories/item/:itemCode', [
  check('itemCode').isNumeric()
], (req, res) => {
  const  itemCode = req.params.itemCode;
  //const email = req.body.email
  //const age   = req.body.age
//})function(req, res) {

    //var itemCode = req.params.itemCode;
    //var item = itemDb.getItem(itemCode);
    //var itemData = itemDb.getItems();
    var category = itemDb.category;
    //console.log('jsdklfjlk')
    itemDb.getItems().then(function(itemdata){
      console.log('jsdlhkilsd')
      itemDb.getItem(itemCode).then(function(item){
        console.log('double loop')
    if(req.session.theUser){
      if(item === undefined){
        res.render('categories', {itemData : itemdata, category : category, userProfile : req.session.userProfile, name: req.session.theUser});
      }
      else {
        res.render('item', { item : item, userProfile : req.session.userProfile, name: null});
      }
    }
    else {
      if(item === undefined ){
          res.render('categories', {itemData : itemdata, category : category, userProfile : null, name: null});
      }
      else {
        res.render('item',{item: item, userProfile : null, name: null});
      }
    }
  })
})
});



router.get('/myitems/save', function(req, res) {
    var code = req.query.itemCode;
    var flag =0;
    if(req.session.theUser){
    // for(let i=0; i<req.session.userProfile.userItems.length; i++){
    //   if(req.session.userProfile.userItems[i].itemCode == code){
    //         flag=1;
    //    }
    // }
    // if(!flag){
    //   var newUserProfile = [];
    //   var itemdata = itemDb.getItem(code);
    //   if(itemdata){
    //     var newUserItem = new UserItem(itemdata.itemCode,itemdata.itemName,itemdata.catalogCategory, 0, 1);
    //       newUserProfile = req.session.userProfile;
    //       newUserProfile.userItems.push(newUserItem);
    //       req.session.userProfile = newUserProfile;
    //     }
    //}
    itemDb.getItem(code).then(function(item){

      if(item){
        userDb.addItem(item,req.session.theUser).then(function(){
          userDb.getUserProfile(req.session.theUser.userId).then(function(userProfile){
            req.session.userProfile = userProfile;
            res.render('myitems',{userProfile:req.session.userProfile, name: req.session.theUser});
         })
        })
      }
    });
    //res.render('myitems',{userProfile:req.session.userProfile, name: req.session.theUser});
  }
  else {
    res.send('Please log in')
    // req.session.theUser = users[0];
    // req.session.userProfile = userProfile[0];
    // for(let i=0;i<userProfile.length;i++){
    //   console.log('sljldjio'+i)
    //   console.log(userProfile[i].userId)
    //   console.log(req.session.theUser.userId)
    //   if(userProfile[i].userId == req.session.theUser.userId){
    //     console.log('hsjkhjjls')
    //     req.session.userProfile = userProfile[i];
    //   }
    // }
    // console.log('sdlkjsdl');
    // console.log(req.session.userProfile)
    // res.render('myitems',{userProfile:req.session.userProfile, name: req.session.theUser});
  }
});


router.get('/myitems/delete', function(req, res) {
      var code = req.query.itemCode
      // var newUserProfile = req.session.userProfile
      // for(let i=0;i<newUserProfile.userItems.length;i++){
      //     if(newUserProfile.userItems[i].itemCode == req.query.itemCode){
      //           newUserProfile.userItems.splice(i,1);
      //     }
      // }
      if(req.session.theUser){
        userDb.deleteItem(code,req.session.theUser).then(function(a){
          userDb.getUserProfile(req.session.theUser.userId).then(function(userProfile){
            req.session.userProfile = userProfile;
            res.render('myitems',{userProfile:req.session.userProfile, name: req.session.theUser});
          })
        })
      
}

else{
  res.send('please log in');
}
});


router.get('/myitems/feedback', function(req, res) {
  var code = req.query.itemCode;
  if(req.session.theUser){
    itemDb.getItem(code).then(function(item){
    //var item = itemDb.getItem(code);
    if(item){
      res.render('feedback',{item:item, userProfile:req.session.userProfile, name: req.session.theUser});
    }
    else {
      res.render('myitems',{userProfile:req.session.userProfile, name: req.session.theUser});
    }
  })
  }
  else {
    res.send("Please log in");
  //   userDb.getUsers().then(function(users){
  //   req.session.theUser = users[0];
  //   userDb.getUserProfile(req.session.theUser.userId).then(function(userProfile){
  //   //for(let i=0;i<userProfile.length;i++){
  //     //if(userprofile[i].userId == req.session.theUser.userId){
  //       req.session.userProfile = userProfile;
  //     //}
  //   //}
  //   console.log('jlsdkjsdjl');
  //   console.log(userProfile);
  //   res.render('myitems',{userProfile:req.session.userProfile, name: req.session.theUser});
  // })
  // })
  }

});

router.get('/myitems/updateRating', function(req, res) {
    var rating = req.query.rating;
    var code= req.query.itemCode;
    if(req.session.theUser){
        if(rating >= 0 && rating <= 5 && rating != undefined){
          userDb.updateRating(code,req.session.theUser,rating).then(function(err){
            userDb.getUserProfile(req.session.theUser.userId).then(function(userProfile){
            // var newUserProfile = req.session.userProfile;

            // for(let i=0; i<newUserProfile.userItems.length; i++){
            //     if(code == newUserProfile.userItems[i].itemCode){
            //         newUserProfile.userItems[i].rating = rating;
            //     }
            //   }
        req.session.userProfile = userProfile;
        res.render('myitems',{userProfile:req.session.userProfile, name: req.session.theUser});
            })
          })
        }
        else {
          res.render('myitems',{userProfile:req.session.userProfile, name: req.session.theUser});
        }
    }
    else {
      res.send('Please log in')
    //   userDb.getUsers().then(function(users){
    //   req.session.theUser = users[0];
    //   // for(let i=0;i<userProfile.length;i++){
    //   //   if(userProfile[i].userId == req.session.theUser.userId){
    //   //       req.session.userProfile = userProfile[i];
    //   //   }
    //   // }
    //   userDb.getUserProfile(req.session.theUser.userId).then(function(userProfile){
    //     req.session.userProfile = userProfile;
    //   res.render('myitems',{userProfile:req.session.userProfile, name: req.session.theUser});
    //   })
    // })
    }

});

router.get('/myitems/updateFlag', function(req, res) {
  var yourItem = req.query.yourItem;
  var code= req.query.itemCode;
  if(req.session.theUser){
      if((yourItem == 0 || yourItem == 1) && (yourItem != undefined)){
        userDb.updateFlag(code,req.session.theUser,yourItem).then(function(err){
          userDb.getUserProfile(req.session.theUser.userId).then(function(userProfile){
          // var newUserProfile = req.session.userProfile;

          // for(let i=0; i<newUserProfile.userItems.length; i++){
          //     if(code == newUserProfile.userItems[i].itemCode){
          //         newUserProfile.userItems[i].yourItem = yourItem;
          //     }
          //   }
            req.session.userProfile = userProfile;
            res.render('myitems',{userProfile:req.session.userProfile, name: req.session.theUser});
          })
        })
      }
      else {
        res.render('myitems',{userProfile:req.session.userProfile, name: req.session.theUser});
      }
  }
  else {
    res.send('please log in');
    //req.session.theUser = users[0];
    // for(let i=0;i<userProfile.length;i++){
    //   if(userProfile[i].userId == req.session.theUser.userId){
    //       req.session.userProfile = userProfile[i];
    //   }
    // }
    //res.render('myitems',{userProfile:req.session.userProfile, name: req.session.theUser});
  }
});

router.get('/*', function(req, res) {
  if(req.session.theUser){
    res.render('index', {userProfile : req.session.userProfile, name: req.session.theUser});
  }
  else {
    res.render('index', {userProfile : null, name: null});
  }
});

module.exports = router;
