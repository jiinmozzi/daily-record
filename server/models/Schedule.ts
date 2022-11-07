const mongoose = require("mongoose");
const {Schema} = mongoose;

const ScheduleSchema = new Schema({
    user : {type : Schema.Types.ObjectId, ref : "User"},
    dateFrom : {type : Date, required : true},
    dateTo : {type : Date, required : true},
    periodLength : Number,
    title : {type : String, required : true},
    content : {type : String},
    createdAt : { type : Date, default : Date.now() }, 
    isCompleted : {type : Boolean, default : false},
    isPublic : {type : Boolean, default : true},
})

const Schedule = mongoose.model('Schedule', ScheduleSchema);
module.exports = Schedule;
export {}

// done by now;