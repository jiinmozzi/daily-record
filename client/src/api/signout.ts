import axios from "axios";
import sendRequest from "./sendRequest";
const signout = async() => {
    // return await axios.get('http://localhost:3002/auth/signout', {withCredentials: true});
    return await sendRequest('auth/signout', "GET", {}, false);   
}
export default signout;