const mongoose = require("mongoose");
const {Schema} = mongoose;

const AssetTradeHistorySchema = new Schema({
    user : {type : Schema.Types.ObjectId, ref : "User"},
    name : String,
    ticker : String,
    price : Number,
    quantity : Number,
    isPurchase : Boolean,
    market : String,
})

const AssetTradeHistory = mongoose.model('AssetTradeHistory', AssetTradeHistorySchema);
module.exports = AssetTradeHistory;
export {}

// done by now