const mongoose = require("mongoose");
const {Schema} = mongoose;

const BookSchema = new Schema({
    user : {type : Schema.Types.ObjectId, ref : "User"},
    title : {type : String, required : true},
    author : {type : String, required : true},
    genre : {type : String, required : true},
    imageUrl : String,
    comment : String,
    from : Number,
    to : Number,
    createdAt : { type : Date, default : Date.now() }, 
    rating : Number,
})

const Book = mongoose.model('Book', BookSchema);
module.exports = Book;
export {}

// done by now;