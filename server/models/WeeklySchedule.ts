const mongoose = require("mongoose");
const {Schema} = mongoose;

const WeeklyScheduleSchema = new Schema({
    user : {type : Schema.Types.ObjectId, required : true},
    day : {type : String, required : true},
    title : {type : String, required : true},
    startTime : {type : Number, required : true},
    endTime : {type : Number, required : true},
    isPublic : {type : Boolean, default : true},
})

const WeeklySchedule = mongoose.model('WeeklyPlanner', WeeklyScheduleSchema);
module.exports = WeeklySchedule;
