const mongoose = require("mongoose");
const {Schema} = mongoose;

const TravelSchema = new Schema({
    user : {type : String, required : true},
    location : {type : Schema.Types.ObjectId, ref : "Location", required : true},
    imageUrl : [{type : String}],
    createdAt : { type : Date, default : Date.now() },
    departureDate : Date,
    arrivalDate : Date,
})

const Travel = mongoose.model('Travel', TravelSchema);
module.exports = Travel;
export {}