import axios from "axios";
import sendRequest from "./sendRequest";
const getAutoLoginUser = async() => {
    // return await axios.get("http://localhost:3002/user/sid", {withCredentials: true});
    return await sendRequest('user/sid', "GET", {}, false);
    // console.log(user);
}

export default getAutoLoginUser;