import axios from "axios";
import { string } from "yargs";
import { SignUpFormType } from "../types";

const signup = async({name, id, password, email, birthday} : SignUpFormType) => {
    return await axios.post('http://localhost:3002/auth/signup', {name, id, password, email, birthday});
}
export default signup;