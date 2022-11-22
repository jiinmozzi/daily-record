const mongoose = require("mongoose");
const {Schema} = mongoose;

const BucketWishListSchema = new Schema({
    user : {type : Schema.Types.ObjectId, required : true},
    imageUrl : [{type : String}],
    createdAt : { type : Date, default : Date.now() },
    title : String,
    comment : String,
    field : String,
    isCompleted : {type : Boolean, default : false},
    isPublic : {type : Boolean, default : true},
})

const BucketWishList = mongoose.model('BucketWishList', BucketWishListSchema);
module.exports = BucketWishList;
export {}