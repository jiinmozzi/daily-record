const mongoose = require("mongoose");
const {Schema} = mongoose;

// each one of keyboard means one key!
const KeyboardSchema = new Schema({
    user : {type : Schema.Types.ObjectId, required : true},
    key : String,
    title : String,
    content : String,
    createdAt : { type : Date, default : Date.now() },
    isPublic : {type : Boolean, default : true},
})

const Keyboard = mongoose.model('Keyboard', KeyboardSchema);
module.exports = Keyboard;
export {}