import axios from "axios";
import sendRequest from "./sendRequest";
const toggleTravelHistory = async(token : string, country : string, type : string) => {
    return await sendRequest('travel/history/toggle', "POST", { country, type }, true, token);
}

export default toggleTravelHistory;