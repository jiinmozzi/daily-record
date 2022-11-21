import sendRequest from "./sendRequest"
const getSchedules = async(token : string) => {
    return await sendRequest("schedule/schedules", "GET", {}, true, token);
}

export default getSchedules