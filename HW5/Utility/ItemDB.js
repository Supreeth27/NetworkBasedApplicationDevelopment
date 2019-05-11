var Item = require('../models/Item');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/nbad')
var Schema = mongoose.Schema;
var itemSchema = new Schema({
    itemCode : Number,
    itemName : String,
    catalogCategory: String,
    description: String,
    rating: String,
    imageURL:String
},{collection:'itemDb'});

var itemData = mongoose.model('itemDb',itemSchema);


module.exports.getItems = function () {
  return new Promise(resolve =>{
      resolve(itemData.find().then(function(d){
        //console.log('gmsfklmks')
        let items = [];
        //console.log('indeieaaeijo')
        console.log(d)
          for (let i = 0; i < d.length; i++) {
            let item = new Item(d[i].itemCode,
              d[i].itemName,
              d[i].catalogCategory,
              d[i].description,
              d[i].rating,

            );
          item.imageURL = item.getImageURL(d[i].itemCode);
          items.push(item);

        }
        return items;
      })
    );

  });

};


module.exports.getItem = function (itemC) {
    console.log(itemC)
  return new Promise(resolve =>{
      resolve(itemData.find({itemCode:itemC}).then(function(d){
          let item = new Item();
          console.log('kdsfjljkklk')
          console.log(d)
          if(d.length > 0){
          d[0].imageURL = item.getImageURL(d[0].itemCode);
          console.log('verifying')
          }
          return d[0];
    }));
  });
};
// module.exports.getItems = function () {
    
//     let items = [];
//     for (let i = 0; i < itemDetails.length; i++) {
//         let item = new Item(itemDetails[i].itemCode,
//             itemDetails[i].itemName,
//             itemDetails[i].catalogCategory,
//             itemDetails[i].description,
//             itemDetails[i].rating,
//             itemDetails[i].imgUrl);
            
//         items.push(item);
        
//     } // end of for
//     return items;
    
//     // return data;
// };

// module.exports.getItem = function (itemCode) {
//     console.info("from DB, Item code :" + itemCode)
//     for (var i = 0; i < itemDetails.length; i++) {
//         // var itemCode = data.itemCode;
//         console.log("Data" + JSON.stringify(itemDetails[i].imgUrl));
//         if (parseInt(itemDetails[i].itemCode) == itemCode) {
//             console.log("Inside if");
//             let item = new Item(itemDetails[i].itemCode,
//                 itemDetails[i].itemName,
//                 itemDetails[i].catalogCategory,
//                 itemDetails[i].description,
//                 itemDetails[i].rating,
//                 //itemDetails[i].imageUrl
//                 );
//                 item.imageURL =   item.getImageURL(itemDetails[i].itemCode);
//             console.log("Item"+JSON.stringify(item));
            
//             return item;
//         }
//         // console.log("Data"+i);
        
//     }
// };

var itemDetails = [
    {
        itemCode: 1,
        itemName: "Cricket Bat",
        catalogCategory: "Cricketing Items",
        description: "This is a bat which was used by Virat Kohli when he scored his highest ODI score till date. He scored 183 aganist Pakistan in 143 balls. He scored this century in Asia cup",
        rating: 5,
        imageUrl: "",
    },
    {
        itemCode: 2,
        itemName: "Cricket Ball",
        catalogCategory: "Cricketing Items",
        description: "This was the ball signed by virat Kohli exclusively when India won 2011 World Cup",
        rating: 4,
        imageUrl: "",
    },
    {
        itemCode: 3,
        itemName: "Stumps",
        catalogCategory: "Cricketing Items",
        description: "These stumps have greater history than Ashes and Dhoni has done stumping to these stumps",
        rating: 3.5,
        imageUrl: "",
    },
    {
        itemCode: 4,
        itemName: "Hat",
        catalogCategory: "Indian Jersey",
        description: "This is the hat signed by Virat Kohli and he used it during Champoins tropy final held on 2015",
        rating: 3.5,
        imageUrl: "",
    },
    {
        itemCode: 5,
        itemName: "Shirt",
        catalogCategory: "Indian Jersey",
        description: "This is the shirt signed by Virat Kohli and has a jersey number of 18 on it",
        rating: 4.5,
        imageUrl: "",
    },
    {
        itemCode: 6,
        itemName: "Arm Guard",
        catalogCategory: "Indian Jersey",
        description: "These are set of arm guards signed by many veteran cricketers like Sachin, Ganguly, Lara and Dravid",
        rating: 4,
        imageUrl: "",
    }
];

module.exports.category = ["Cricketing Items", "Indian Jersey"];