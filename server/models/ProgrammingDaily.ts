const mongoose = require("mongoose");
const {Schema} = mongoose;

const ProgrammingDailySchema = new Schema({
    user : {type : Schema.Types.ObjectId, ref : "User"},
    title : {type : String, required : true},
    content : {type : String},
    siteUrl : String,
    imageUrl : String,
    createdAt : { type : Date, default : Date.now() }, 
    histories : { 
        title : String,
        content : String,
        createdAt : Date
    },
    isPublic : {
        type : Boolean,
        default : true,
    }
})

const ProgrammingDaily = mongoose.model('ProgrammingDaily', ProgrammingDailySchema );
module.exports = ProgrammingDaily;
export {}

// done by now