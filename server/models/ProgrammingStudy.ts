const mongoose = require("mongoose");
const {Schema} = mongoose;

const ProgrammingStudySchema = new Schema({
    user : {type : Schema.Types.ObjectId, ref : "User"},
    classification : String,
    title : {type : String, required : true},
    content : {type : String},
    githubLink : String,
    siteUrl : String,
    imageUrl : String,
    createdAt : { type : Date, default : Date.now() }, 
    isCompleted : {type : Boolean, default : false},
    histories : { 
        title : String,
        content : String,
        createdAt : Date
    },
    isPublic : {type : Boolean, default : true},
})

const ProgrammingStudy = mongoose.model('ProgrammingStudy', ProgrammingStudySchema);
module.exports = ProgrammingStudy;
export {}

// done by now