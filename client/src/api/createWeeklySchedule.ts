import sendRequest from "./sendRequest"

type WeeklyScheduleFormType = {
    day : string,
    title : string,
    startTime : Number,
    endTime : Number,
    isPublic : boolean,
}

const createWeeklySchedule = async(token : string, {day, title, startTime, endTime, isPublic} : WeeklyScheduleFormType) => {
    return await sendRequest('schedule/weekly', 'POST', {day, title, startTime, endTime, isPublic}, true, token);
}

export default createWeeklySchedule;