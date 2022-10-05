const mongoose = require("mongoose");
const {Schema} = mongoose;

const TravelSchema = new Schema({
    user : {type : String, required : true},
    location : {type : Schema.Types.ObjectId, ref : "Location", required : true},
    
    imageUrl : String,
    createdAt : { type : Date, default : Date.now() }, 
})

const Travel = mongoose.model('Travel', TravelSchema);
module.exports = Travel;
export {}