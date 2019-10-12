class UserProfile{
    constructor(UserId, UserItems){
      this.UserId= UserId;
      this.UserItems=UserItems;
    }

    addItem(UserItem){
        flag = 0;
        /*for(i = 0; i < UserItems.length; i++){
            if(UserItems[i])
        }*/
        if(this.UserItems.includes(UserItem));
            flag = 1;
        if(!flag){
            this.UserItems.push(UserItem);
        }
        return this.UserItems;
    }

    removeItem(Item){
      this.itemCode = Item.itemCode;
      var ItemObj=[];
      for (i=0;i<this.UserItems.length;i++){
        ItemObj.push(this.UserItems[i].item.itemCode);
      }
      //if(UserItems[i].item.itemCode)
      if(ItemObj.includes(itemCode)){
        /*for (i=0;i<this.UserItems.length;i++){
          if(this.UserItems[i].Item==ItemID){
            this.UserItems.splice(i,1);
            return 'the following'+ ItemID +' is removed';
          }
        }*/
        this.UserItems.splice(this.UserItems.indexof(ItemID), 1);
        return 'the following'+ ItemID +' is removed';
      }
      else{
        return 'there are no such '+ ItemID+' in profile';
      }
  
    }

    updateItem(UserItem){
        for (i=0;i<this.UserItems.length;i++){
            if(this.UserItems[i].item.itemCode == UserItem.item.itemCode){
              this.UserItems[i].rating = UserItem.rating;
              this.UserItems[i].yourItem = UserItem.yourItem;
              return 'the following'+ UserItem.item +' is updated';
            }
        }
    }
    
    getItems(){
      return this.UserItems;
  
    }
    emptyProfile(){
       delete this.UserId;
       delete this.UserItems;
    }
}
  
module.exports=UserProfile;
  