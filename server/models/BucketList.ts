const mongoose = require("mongoose");
const {Schema} = mongoose;

const BucketListSchema = new Schema({
    user : {type : Schema.Types.ObjectId, required : true},
    imageUrl : {type : String},
    createdAt : { type : Date, default : Date.now() },
    title : String,
    comment : String,
    field : String,
    isCompleted : {type : Boolean, default : false},
    isPublic : {type : Boolean, default : true},
})

const BucketList = mongoose.model('BucketList', BucketListSchema);
module.exports = BucketList;
export {}