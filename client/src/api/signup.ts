import axios from "axios";
// import { string } from "yargs";
import sendRequest from "./sendRequest";
import { SignUpFormType } from "../types";

const signup = async({name, id, password, email, birthday} : SignUpFormType) => {
    return await sendRequest('auth/signup', "POST", {name, id, password, email, birthday}, false);
}
export default signup;