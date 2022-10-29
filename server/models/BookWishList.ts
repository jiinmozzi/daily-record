const mongoose = require("mongoose");
const {Schema} = mongoose;

const BookWishListSchema = new Schema({
    user : {type : Schema.Types.ObjectId, ref : "User"},
    title : {type : String, required : true},
    authors : [{type : String, required : true}],
    genre : {type : String, required : true},
    contents : String,
    imageUrl : String,
    datetime : String,
    createdAt : { type : Date, default : Date.now() }, 
    isCompleted : {type : Boolean, default : false},
    isPublic : {type : Boolean, default : true},
    price : Number,
})

const BookWishList = mongoose.model('BookWishList', BookWishListSchema);
module.exports = BookWishList;
export {}

// done by now;