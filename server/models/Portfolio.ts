const mongoose = require("mongoose");
const {Schema} = mongoose;

const PortfolioSchema = new Schema({
    user : {type : Schema.Types.ObjectId, ref : "User"},
    dateFrom : {type : Date, required : true},
    dateTo : {type : Date},
    title : {type : String, required : true},
    content : {type : String},
    githubLink : String,
    siteUrl : String,
    imageUrl : String,
    createdAt : { type : Date, default : Date.now() }, 
    isCompleted : {type : Boolean, default : false},
    history : { 
        title : String,
        content : String,
        createdAt : Date
    },
    isPublic : {
        type : Boolean,
        default : true,
    }
})

const Portfolio = mongoose.model('Portfolio', PortfolioSchema);
module.exports = Portfolio;
export {}

// done by now