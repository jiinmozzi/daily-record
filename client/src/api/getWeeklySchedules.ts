import sendRequest from "./sendRequest"
const getWeeklySchedules = async(token : string) => {
    return await sendRequest("schedule/weekly", "GET", {}, true, token);
}

export default getWeeklySchedules;