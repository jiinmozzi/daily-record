import axios from "axios";
const signin = async(id : string, password : string, autoLogin : boolean) => {
    return await axios.post('http://localhost:3002/auth/signin', {id, password, autoLogin}, {withCredentials: true});
    
}
export default signin;