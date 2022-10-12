import axios from "axios";

const reIssueAccessToken = async(token : string) => {
    return await axios.post("http://localhost:3002/auth/reissue/access", {accessToken : token}, {withCredentials: true});
    // console.log(user);
}

export default reIssueAccessToken;