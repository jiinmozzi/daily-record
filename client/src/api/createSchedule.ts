import { string } from "yargs";
import sendRequest from "./sendRequest";

type ScheduleFormType = {
    dateFrom : Date,
    dateTo : Date,
    title : string,
    content : string,
    isCompleted : boolean,
}
const createSchedule = async(token : string, {dateFrom, dateTo, title, content, isCompleted = false} : ScheduleFormType) => {
    return await sendRequest('schedule/create', "POST", {dateFrom, dateTo, title, content, isCompleted}, true, token);
}

export default createSchedule;