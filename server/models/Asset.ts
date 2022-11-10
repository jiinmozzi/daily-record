const mongoose = require("mongoose");
const {Schema} = mongoose;

const AssetSchema = new Schema({
    user : {type : Schema.Types.ObjectId, ref : "User"},
    name : String,
    ticker : String,
    sector : String,
    balance : Number,
})

AssetSchema.index({name: 1, user: 1}, {unique : true});
const Asset = mongoose.model('Asset', AssetSchema);
module.exports = Asset;
export {}

// done by now