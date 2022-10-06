const mongoose = require("mongoose");
const {Schema} = mongoose;

const UserSchema = new Schema({
    name : { type : String, required : true },
    id : { type : String, required : true, unique : true },
    password : {type : String, required : true },
    email : { type : String, required : true },
    birthday : {type : String, required : true},
    createdAt : { type : Date, default : Date.now() }, 
    books : [{type : Schema.Types.ObjectId, ref : "Book"}],
    workouts : [{type : Schema.Types.ObjectId, ref : "Workout"}],
    travels : [{ type : Schema.Types.ObjectId, ref : "Travel"}],
    schedules : [{type : Schema.Types.ObjectId, ref : "Schedule"}],
    diaries : [{ type : Schema.Types.ObjectId, ref : "Diary" }],
    terminals : [{type : Schema.Types.ObjectId, ref : "Terminal"}],
    wishLists : [{type : Schema.Types.ObjectId, ref : "WishList"}],
    followers : [{type : Schema.Types.ObjectId, ref : "User"}],
    followings : [{type : Schema.Types.ObjectId, ref : "USer"}],
    refreshToken : String,
    sessionId : String,
})

const User = mongoose.model('User', UserSchema);
module.exports = User;
export {};