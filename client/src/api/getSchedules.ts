import sendRequest from "./sendRequest"
const getSchedules = async(token : string) => {
    return await sendRequest("schedule", "GET", {}, true, token);
}

export default getSchedules