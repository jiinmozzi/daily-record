import axios from "axios";
// import { string } from "yargs";
import sendRequest from "./sendRequest";
import { SignUpFormType } from "../types";

const signup = async({name, id, password, email, birthday} : SignUpFormType) => {
    // return await axios.post('http://localhost:3002/auth/signup', {name, id, password, email, birthday});
    return await sendRequest('auth/signup', "POST", {name, id, password, email, birthday}, false);
}
export default signup;