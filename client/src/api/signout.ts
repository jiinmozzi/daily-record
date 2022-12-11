import sendRequest from "./sendRequest";
const signout = async() => {
    return await sendRequest('auth/signout', "GET", {}, false);   
}
export default signout;