const {Schedule} = require("./models/Schedule");

const init = async() => {
    const schedules = await Schedule.find({});
    console.log(schedules);
}

init();