import axios from "axios";
import sendRequest from "./sendRequest";

const reIssueAccessToken = async(token : string) => {
    return await sendRequest('auth/reissue/access', "POST", {accessToken : token}, false);
}

export default reIssueAccessToken;