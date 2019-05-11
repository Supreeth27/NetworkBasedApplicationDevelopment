var User = require('../models/User');
var UserItem = require('../models/UserItem');
var UserProfile = require('../models/UserProfile');
var mongoose = require('mongoose');
var express = require('express');
var app = module.exports = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
mongoose.connect('mongodb://localhost:27017/nbad',{useNewUrlParser: true});
var schema = mongoose.Schema;

var userSchema = new schema({
  userId : {type: Number, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, requied: true},
  emailAddress : {type: String, requied: true}
  // degree: String,
  // program: String
},{collection:'users'});

var userModel = mongoose.model('users', userSchema);

var userProfileSchema = new schema({
  userId : {type: Number, required: true},
  itemCode:Number,
  itemName:String,
  catalogCategory:String,
  rating:String,
  yourItem:String
},{collection:'userProfile'});

var userProfileModel = mongoose.model('userProfile', userProfileSchema);
//var allItems=itemDB.getallitems(itemDB.allItems)
// var usersData = [
//   {

//     userId : 1,
//     firstName : 'Supreeth',
//     lastName : 'Segu',
//     emailAddress : 'developer@google.com'
//   }
// ]

//module.exports.getUser = userModel.findOne({firstName: student.firstName, lastName: student.lastName}, function(err,doc){
  // if(doc == null){
  //   var data = new studentInfoModel(student);
  //   data.save();
  // }else{
  //   doc.firstName = student.firstName;
  //   doc.lastName = student.lastName;
  //   doc.degree = student.degree;
  //   doc.program = student.program;
  //   doc.save();
  // }
//});

module.exports.getUsers = function(){
  return new Promise(resolve =>{
      resolve(userModel.find().then(function(d){
          return d;
      })
    );

  });
}

// module.exports.getUsers = function () {
//   let users = [];
//   for(let i = 0 ; i < usersData.length ; i++){
//     let user = new User(usersData[i].userId, usersData[i].firstName, usersData[i].lastName,
//                         usersData[i].emailAddress)
//     users.push(user);
//   }
//   return users;
// }

// var usersProfileData = [


// {
//   userId : 1,
//   userItems : [
//     {
//       itemCode : '1',
//       itemName : 'Cricket bat',
//       categoryName : 'Cricketing Items',
//       rating : 4,
//       yourItem : 1
//     },
//     {
//       itemCode : '4',
//       itemName : 'Hat',
//       categoryName : 'Indian Jersey',
//       rating : 5,
//       yourItem : 0
//     }
//   ]
// }
// ]

// module.exports.getUsersProfile = function () {

//   let usersProfile = [];
//   let userItems = [];
//   for (let i = 0 ; i < usersProfileData.length; i++){
//     let userProfile = new UserProfile(usersProfileData[i].userId);
//     for(let j = 0 ; j < usersProfileData[i].userItems.length; j++){
//       let userItem = new UserItem(usersProfileData[i].userItems[j].itemCode,usersProfileData[i].userItems[j].itemName,usersProfileData[i].userItems[j].categoryName, usersProfileData[i].userItems[j].rating, usersProfileData[i].userItems[j].madeIt )
//       userItems.push(userItem);
//     }
//     userProfile.userItems = userItems;
//     usersProfile.push(userProfile);
// }
// return usersProfile;
// }

module.exports.getUsersProfile = function(){
  return new Promise(resolve =>{
      resolve(userProfileModel.find().then(function(d){

          return d;
      })
    );
  });
}

module.exports.getUserProfile  = function(Id){
  return new Promise(resolve =>{
      resolve(userProfileModel.find({userId:Id}).then(function(d){
          console.log(d)
          return d;
      })
    );
  });
}


// module.exports.getAllUsers = function(){
//   return new Promise(resolve =>{
//       resolve(userData.find().then(function(d){
//           return d;
//       })
//     );

//   });
// }
module.exports.getUser = function(Id){
  return new Promise(resolve =>{
      resolve(userModel.find({userId:Id}).then(function(d){
          return d;
      })
    );

  });
}

module.exports.addItem = function(item,user){
    return new Promise(resolve =>{
    resolve(userProfileModel.find({userId:user.userId,itemCode:item.itemCode},function(err,d){
        if(d.length === 0){
          var temp = {
          userId :user.userId ,
          itemCode:item.itemCode,
          itemName:item.itemName,
          catalogCategory:item.catalogCategory,
          rating:item.rating,
          yourItem:"0"

        }
        var data = new userProfileModel(temp)
        data.save()
        return "yes";
    }
  })
  )
  
})
}
module.exports.deleteItem = function(code,id){

      return new Promise(resolve =>{
          resolve(userProfileModel.findOneAndDelete({userId:id.userId,itemCode:code}).exec(function(err){
            return "yes";
          })
);
});

}
module.exports.updateRating = function(code,id,rate){
  return new Promise(resolve =>{
      resolve( userProfileModel.findOneAndUpdate({userId:id.userId,itemCode:code},{rating:rate}).exec(function(err){
        return "yes";
      })
);
});

}
module.exports.updateFlag = function(code,id,you){
  return new Promise(resolve =>{
      resolve( userProfileModel.findOneAndUpdate({userId:id.userId,itemCode:code},{yourItem:you}).exec(function(err){
        return "yes";
      })
);
});

}
