import mongoose from 'mongoose';

const Asset = require('./Asset');
const AssetTradeHistory = require('./AssetTradeHistory');
const Book = require('./Book');
const BookWishList = require('./BookWishList');
const BucketList = require('./BucketList');
const BucketWishList = require('./BucketWishList');
const Coin = require('./Coin');
const CoinTradeHistory = require('./CoinTradeHistory');
const Diary = require('./Diary');
const User = require('./User');
const Schedule = require('./Schedule');
const Outsourcing = require('./Outsourcing');
const ProgrammingPortfolio = require('./ProgrammingPortfolio');
const ProgrammingStudy = require('./ProgrammingStudy');
const ProgrammingDaily = require('./ProgrammingDaily');
const Keyboard = require('./Keyboard');
const Travel = require('./Travel');
const TravelWishList = require('./TravelWishList');
const Fitness = require('./Fitness');
const WeeklySchedule = require('./WeeklySchedule');
// import {User} from './User';

require('dotenv').config();

const mongoURL = `mongodb://${process.env.DB_ID}:${process.env.DB_PW}@ac-7hvpfnw-shard-00-00.sdcytd6.mongodb.net:27017,ac-7hvpfnw-shard-00-01.sdcytd6.mongodb.net:27017,ac-7hvpfnw-shard-00-02.sdcytd6.mongodb.net:27017/?ssl=true&replicaSet=atlas-117uss-shard-0&authSource=admin&retryWrites=true&w=majority`
mongoose.connect(mongoURL);

switch(mongoose.connection.readyState){
    case 0:
        console.log("Mongo DB disconnected");
        break;
    case 1:
        console.log("Mongo DB connected");
        break;
    case 2:
        console.log("Mongo DB connecting");
        break;
    case 3:
        console.log("Mongo DB disconnecting");
        break;
    default:
        console.log("Mongo DB seems to have unidentified error");
        break;
}


module.exports = {Asset, Book, BookWishList, BucketList, BucketWishList, Coin, CoinTradeHistory, Diary, Outsourcing, ProgrammingPortfolio, ProgrammingStudy, ProgrammingDaily, Schedule, Travel, TravelWishList, User, Keyboard, Fitness, WeeklySchedule};
// export {}