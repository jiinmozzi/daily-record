const mongoose = require("mongoose");
const {Schema} = mongoose;

const OutSourcingSchema = new Schema({
    user : {type : Schema.Types.ObjectId, ref : "User"},
    dateFrom : {type : Date, required : true},
    dateTo : Date,
    type : String,    
    title : {type : String, required : true},
    content : {type : String},
    compensation : Number,
    githubLink : String,
    siteUrl : String,
    imageUrl : String,
    createdAt : { type : Date, default : Date.now() },
    history : { 
        title : String,
        content : String,
        createdAt : Date
    },
    isCompleted : { type : Boolean, default : false},
    isPublic : {
        type : Boolean,
        default : true,
    }
})

const OutSourcing = mongoose.model('OutSourcing', OutSourcingSchema);
module.exports = OutSourcing;
export {}

// done by now;