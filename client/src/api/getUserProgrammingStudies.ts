import sendRequest from "./sendRequest";
const getUserProgrammingStudies = async(token : string) => {
    return await sendRequest('terminal/study', "GET", {}, true, token)
}

export default getUserProgrammingStudies;