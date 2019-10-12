class UserItem {

    constructor(item, rating, yourItem) {
        this._item = item;
        this._rating = rating;
        this._yourItem = yourItem;
    }
    
    /**
     *
     * Getter and Setters
     */
    
    get item() {
        return this._item;
    }
    
    set item(value) {
        this._item = value;
    }
    
    get rating() {
        return this._rating;
    }
    
    set rating(value) {
        this._rating = value;
    }
    
    get yourItem() {
        return this._yourItem;
    }
    
    set yourItem(value) {
        this._yourItem = value;
    }
    
}
module.exports = UserItem;