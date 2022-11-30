const mongoose = require("mongoose");
const {Schema} = mongoose;

// each one of keyboard means one key!
const NewsSchema = new Schema({
    title : String,
    author : String,
    description : String,
    publishedAt : { type : Date, default : Date.now() },
    url : String,
    urlToImage : String,
})

const News = mongoose.model('News', NewsSchema);
module.exports = News;
export {}