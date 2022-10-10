import axios from "axios";

const getRefTokenUser = async() => {
    return await axios.get("http://localhost:3002/user/refresh", {withCredentials: true});
    // console.log(user);
}

export default getRefTokenUser;