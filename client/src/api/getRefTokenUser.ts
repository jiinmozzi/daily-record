import axios from "axios";
import sendRequest from "./sendRequest";

const getRefTokenUser = async() => {
    return await sendRequest('user/refresh', "GET", {}, false);
}

export default getRefTokenUser;