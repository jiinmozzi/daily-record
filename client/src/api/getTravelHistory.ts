import sendRequest from "./sendRequest"

const getTravelHistory = async(token : string) => {
    return await sendRequest("travel/history", "GET", {}, true, token);
}

export default getTravelHistory;