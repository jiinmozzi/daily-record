const mongoose = require("mongoose");
const {Schema} = mongoose;

const CoinTradeHistorySchema = new Schema({
    user : {type : Schema.Types.ObjectId, ref : "User"},
    name : String,
    ticker : String,
    price : Number,
    quantity : Number,
    isPurchase : Boolean,
})

const CoinTradeHistory = mongoose.model('CoinTradeHistory', CoinTradeHistorySchema);
module.exports = CoinTradeHistory;
export {}

// done by now