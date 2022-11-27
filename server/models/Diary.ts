const mongoose = require("mongoose");
const {Schema} = mongoose;

const DiarySchema = new Schema({
    user : {type : Schema.Types.ObjectId, ref : "User"},
    date : {type : Date, required : true},
    title : {type : String, required : true},
    content : {type : String},
    emojiCode : String,
    createdAt : { type : Date, default : Date.now() }, 
    isPublic : {type : Boolean, default : true},
})

const Diary = mongoose.model('Diary', DiarySchema);
module.exports = Diary;
export {}

// done by now;