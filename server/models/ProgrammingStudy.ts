const mongoose = require("mongoose");
const {Schema} = mongoose;

const ProgrammingStudySchema = new Schema({
    user : {type : Schema.Types.ObjectId, ref : "User"},
    type : String,
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
})

const ProgrammingStudy = mongoose.model('ProgrammingStudy', ProgrammingStudySchema);
module.exports = ProgrammingStudy;
export {}

// done by now