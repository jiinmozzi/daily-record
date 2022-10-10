const mongoose = require("mongoose");
const {Schema} = mongoose;

const TravelSchema = new Schema({
    user : {type : String, required : true},
    country : {type : String, required : true},
    city : {type : String, required : true},
    imageUrl : [{type : String}],
    createdAt : { type : Date, default : Date.now() },
    title : String,
    comment : String,
    departureDate : Date,
    arrivalDate : Date,
    duration : Number,
    
})

const Travel = mongoose.model('Travel', TravelSchema);
module.exports = Travel;
export {}