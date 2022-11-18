import sendRequest from "./sendRequest";
const getUserProgrammingDailies = async(token : string) => {
    return await sendRequest('terminal/daily', "GET", {}, true, token)
}

export default getUserProgrammingDailies;