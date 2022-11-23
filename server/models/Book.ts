const mongoose = require("mongoose");
const {Schema} = mongoose;

const BookSchema = new Schema({
    user : {type : Schema.Types.ObjectId, ref : "User"},
    title : {type : String, required : true},
    authors : [{type : String, required : true}],
    genre : String,
    imageUrl : String,
    comment : String,
    from : Number,
    to : Number,
    createdAt : { type : Date, default : Date.now() }, 
    datetime : String, // 출간일
    contents : String,
    rating : Number,
    isCompleted : {type : Boolean, default : false},
    isPublic : {type : Boolean, default : true},
    price : Number,
})

const Book = mongoose.model('Book', BookSchema);
module.exports = Book;
export {}

// done by now;