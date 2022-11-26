import sendRequest from "./sendRequest"
const getDiaries = async (token : string) => {
    return await sendRequest('diary/diaries', "GET", {}, true, token)
}

export default getDiaries;