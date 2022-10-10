const mongoose = require("mongoose");
const {Schema} = mongoose;

const BookWishListSchema = new Schema({
    user : {type : Schema.Types.ObjectId, ref : "User"},
    title : {type : String, required : true},
    author : {type : String, required : true},
    genre : {type : String, required : true},
    imageUrl : String,
    createdAt : { type : Date, default : Date.now() }, 
    isCompleted : {type : Boolean, default : false},
})

const BookWishList = mongoose.model('BookWishList', BookWishListSchema);
module.exports = BookWishList;
export {}

// done by now;