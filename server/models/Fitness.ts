const mongoose = require("mongoose");
const {Schema} = mongoose;

const FitnessSchema = new Schema({
    user : {type : Schema.Types.ObjectId, ref : "User"},
    date : {type : Date, required : true},
    reps : Number,
    sets : Number,
    title : {type : String, required : true},
    content : {type : String},
    imageUrl : String,
    createdAt : { type : Date, default : Date.now() }, 

})

const Fitness = mongoose.model('Fitness', FitnessSchema);
module.exports = Fitness;
export {}

// done by now;