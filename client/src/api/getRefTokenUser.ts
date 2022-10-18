import axios from "axios";
import sendRequest from "./sendRequest";

const getRefTokenUser = async() => {
    // return await axios.get("http://localhost:3002/user/refresh", {withCredentials: true});
    return await sendRequest('user/refresh', "GET", {}, false);
    // console.log(user);
}

export default getRefTokenUser;