const mongoose = require("mongoose");
const {Schema} = mongoose;

const TravelWishListSchema = new Schema({
    user : {type : Schema.Types.ObjectId, required : true},
    country : {type : String, required : true},
    city : {type : String, required : true},
    imageUrl : [{type : String}],
    createdAt : { type : Date, default : Date.now() },
    title : String,
    comment : String,
    isPublic : {type : Boolean, default : true},
})

const TravelWishList = mongoose.model('TravelWishList', TravelWishListSchema);
module.exports = TravelWishList;
export {}