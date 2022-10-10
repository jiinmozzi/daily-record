import axios from "axios";
const signout = async() => {
    return await axios.get('http://localhost:3002/auth/signout', {withCredentials: true});
    
}
export default signout;