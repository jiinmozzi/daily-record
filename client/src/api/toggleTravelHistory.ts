import axios from "axios";
import sendRequest from "./sendRequest";
const toggleTravelHistory = async(token : string, country : string, type : string) => {
    // return await axios.get("http://localhost:3002/user/sid", {withCredentials: true});
    return await sendRequest('travel/history/toggle', "POST", { country, type }, true, token);
    // console.log(user);
}

export default toggleTravelHistory;