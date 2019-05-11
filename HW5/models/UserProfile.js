class UserProfile{
    constructor(userId){
      this.userId= userId;
      this.userItems=[];
    }

    
    addItem(userItem){
      flag = 0;
      /*for(i = 0; i < UserItems.length; i++){
          if(UserItems[i])
      }*/
      if(this.userItems.includes(userItem));
          flag = 1;
      if(!flag){
          this.userItems.push(userItem);
      }
      return this.userItems;
    }

    removeItem(item){
    for(i = 0 ; i < this.userItems.length; i++){
      if(this.userItems[i].itemCode == item.itemCode){
        this.userItems.splice(i, 1);
      }
    }
    }


    updateItem(userItem){
      for (i=0;i<this.userItems.length;i++){
        if(this.userItems[i].item.itemCode == userItem.item.itemCode){
          this.userItems[i].rating = userItem.rating;
          this.userItems[i].yourItem = userItem.yourItem;
          return 'the following'+ userItem.item +' is updated';
        }
      }
    }
    
    
    getItems(){
      return this.userItems;
  
    }
    emptyProfile(){
       delete this.UserId;
       delete this.UserItems;
    }
}
  
module.exports=UserProfile;
  