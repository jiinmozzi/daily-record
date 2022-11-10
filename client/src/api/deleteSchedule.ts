import sendRequest from "./sendRequest";

const deleteSchedule = async(token : string, _id : string) => {
    return await sendRequest(`schedule/delete/${_id}`, "DELETE", {}, true, token);
}

export default deleteSchedule;