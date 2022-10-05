import axios from "axios";
const signin = async(id : string, password : string) => {
    const res = await axios.post('http://localhost:3002/auth/signin', {id, password, isRequired : false});
    
}
export default signin;