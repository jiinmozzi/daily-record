const mongoose = require("mongoose");
const {Schema} = mongoose;

const UserSchema = new Schema({
    name : { type : String, required : true },
    id : { type : String, required : true, unique : true },
    password : {type : String, required : true },
    email : { type : String, required : true },
    birthday : {type : String, required : true},
    nickname :  String,
    createdAt : { type : Date, default : Date.now() }, 
    books : [{type : Schema.Types.ObjectId, ref : "Book"}],
    bookWishLists : [{type : Schema.Types.ObjectId, ref : "BookWishList"}],
    outsourcings : [{type : Schema.Types.ObjectId, ref : "Outsourcing"}],
    portfolios : [{type : Schema.Types.ObjectId, ref : "Portfolio"}],
    programmingStudies : [{type : Schema.Types.ObjectId, ref : "ProgrammingStudy"}],
    workouts : [{type : Schema.Types.ObjectId, ref : "Workout"}],
    visitedCountries : [{type : String}],
    wishListCountries : [{type : String}],
    travels : [{ type : Schema.Types.ObjectId, ref : "Travel"}],
    travelWishLists : [{type : Schema.Types.ObjectId, ref : "TravelWishList"}],
    schedules : [{type : Schema.Types.ObjectId, ref : "Schedule"}],
    diaries : [{ type : Schema.Types.ObjectId, ref : "Diary" }],
    bucketLists : [{type : Schema.Types.ObjectId, ref : "BucketList"}],
    followers : [{type : Schema.Types.ObjectId, ref : "User"}],
    followings : [{type : Schema.Types.ObjectId, ref : "User"}],
    publicSections  : [{type : String}],
    refreshToken : String,
    sessionId : String,
})

const User = mongoose.model('User', UserSchema);
module.exports = User;
export default User;