import sendRequest from "./sendRequest";
const createSchedule = async(token : string) => {
    return await sendRequest('schedule/create', "POST", {}, true, token);
}

export default createSchedule;