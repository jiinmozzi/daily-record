import axios from "axios";
import sendRequest from "./sendRequest";
const signin = async(id : string, password : string, autoLogin : boolean) => {
    return await sendRequest('auth/signin', "POST", {id, password, autoLogin}, false);
    // return await axios.post('http://localhost:3002/auth/signin', {id, password, autoLogin}, {withCredentials: true});
    
}
export default signin;