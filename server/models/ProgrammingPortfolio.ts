const mongoose = require("mongoose");
const {Schema} = mongoose;

const ProgrammingPortfolioSchema = new Schema({
    user : {type : Schema.Types.ObjectId, ref : "User"},
    dateFrom : {type : Date},
    dateTo : {type : Date},
    title : {type : String, required : true},
    content : String,
    githubLink : String,
    siteUrl : String,
    imageUrl : String,
    createdAt : { type : Date, default : Date.now() }, 
    isCompleted : {type : Boolean, default : false},
    onProcess : {type : String, required : true},
    histories : [{ 
        title : String,
        content : String,
        createdAt : Date
    }],
    isPublic : {
        type : Boolean,
        default : true,
    }
})

const ProgrammingPortfolio = mongoose.model('ProgrammingPortfolio', ProgrammingPortfolioSchema);
module.exports = ProgrammingPortfolio;
export {}

// done by now