import sendRequest from "./sendRequest";

const completeSchedule = async(token : string, _id : string) => {
    return await sendRequest('schedule/complete', "POST", {_id}, true, token);
}

export default completeSchedule;