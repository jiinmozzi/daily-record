import axios from "axios";

const getAutoLoginUser = async() => {
    return await axios.get("http://localhost:3002/user/sid", {withCredentials: true});
    // console.log(user);
}

export default getAutoLoginUser;