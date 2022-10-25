import axios from "axios";
import sendRequest from "./sendRequest";

const reIssueAccessToken = async(token : string) => {
    // return await axios.post("http://localhost:3002/auth/reissue/access", {accessToken : token}, {withCredentials: true});
    return await sendRequest('auth/reissue/access', "POST", {accessToken : token}, false);
    // console.log(user);
}

export default reIssueAccessToken;