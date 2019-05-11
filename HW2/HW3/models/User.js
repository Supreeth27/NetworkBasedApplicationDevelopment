class User {

    constructor(userID, firstName, lastName, emailID) {
        this._userID = userID;
        this._firstName = firstName;
        this._lastName = lastName;
        this._emailID = emailID;
    }
    
    /**
     *
     * Getter and Setters
     */
    
    get userID() {
        return this._userID;
    }
    
    set userID(value) {
        this._userID = value;
    }
    
    get firstName() {
        return this._firstName;
    }
    
    set firstName(value) {
        this._firstName = value;
    }
    
    get lastName() {
        return this._lastName;
    }
    
    set lastName(value) {
        this._lastName = value;
    }
    
    get emailID() {
        return this._emailID;
    }
    
    set emailID(value) {
        this._emailID = value;
    }
    
}
module.exports = User;