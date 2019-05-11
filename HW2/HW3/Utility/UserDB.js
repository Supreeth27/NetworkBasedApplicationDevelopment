var UserItem= require('../models/UserItem.js');
var User= require('../models/User.js');
var UserProfile= require('../models/UserProfile.js');
var itemDB= require('./itemDB.js');

//var allItems=itemDB.getallitems(itemDB.allItems)

var items = itemDB.getItems();

//var user1= new User('u1','tester','js','tester@gmail.com','151 stone creek dr','Apt D', 'charlotte','NC','28241','USA');
//var user2= new User('u2','developer','js','developer@gmail.com','220 rocky drive','Apt A','Charlotte','NC','24351','USA');
var user1= new User('u1','tester','js','tester@gmail.com');
var user2= new User('u2','developer','js','developer@gmail.com');
var UserItem1= new UserItem(items[0],'5','false');
var UserItem2= new UserItem(items[4],'4','true');
var UserItem3= new UserItem(items[1],'4','false');
var UserProfile1= new UserProfile(user1.UserId,[UserItem1,UserItem2,UserItem3]);
var UserProfile2= new UserProfile(user2.UserId,[UserItem2,UserItem3]);

var Users=[user1,user2];
var UserItems= [UserItem1,UserItem2,UserItem3];
var UserProfiles= [UserProfile1,UserProfile2];

var listofusers= [];
var UserIds= function(UserProfiles){
  for (i=0;i<UserProfiles.length;i++){
    listofusers.push(UserProfiles[i].UserId);
  }
  return listofusers;
}
UserIds(UserProfiles);

var getUsers = function getUsers(Users){
    //for(i = 0; i < )
  return Users;
}
var getUserProfile=function (UserId){
   if(listofusers.includes(UserId)){
     for (i=0;i<UserProfiles.length;i++){
       if(UserProfiles[i].UserId==UserId){
         return UserProfiles[i];
       }
     }
     }
     else{
       return " No user Found ";
     }

 }

 var useritemcodes= function(UserItems){
  this.UserItems=UserItems;
  var itemcodeobj=[];
  for(var i=0;i<UserItems.length;i++){
      itemcodeobj.push(UserItems[i].Item.itemcode);
  }
  return itemcodeobj;
}

module.exports.Users=Users;
module.exports.UserItems=UserItems;
module.exports.UserProfiles=UserProfiles;
module.exports.getUsers=getUsers;
module.exports.UserProfile=UserProfile;
module.exports.getUserProfile=getUserProfile;
module.exports.useritemcodes=useritemcodes;
