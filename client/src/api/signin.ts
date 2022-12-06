import axios from "axios";
import sendRequest from "./sendRequest";
const signin = async(id : string, password : string, autoLogin : boolean) => {
    return await sendRequest('auth/signin', "POST", {id, password, autoLogin}, false);
}
export default signin;