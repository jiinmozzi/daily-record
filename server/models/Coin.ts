const mongoose = require("mongoose");
const {Schema} = mongoose;

const CoinSchema = new Schema({
    user : {type : Schema.Types.ObjectId, ref : "User"},
    name : String,
    ticker : String,
    averagePrice : Number,
    balance : Number,
})

CoinSchema.index({name: 1, user: 1}, {unique : true});
const Coin = mongoose.model('Coin', CoinSchema);
module.exports = Coin;
export {}

// done by now