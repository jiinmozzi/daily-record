import axios from "axios";
import sendRequest from "./sendRequest";
const getAutoLoginUser = async() => {
    return await sendRequest('user/sid', "GET", {}, false);
    // console.log(user);
}

export default getAutoLoginUser;