import axios from "axios";
const baseUrl = process.env.REACT_APP_ENV === 'development' 
    ? process.env.REACT_APP_DEVELOPMENT_URL
    : process.env.REACT_APP_PRODUCTION_URL;
// const baseUrl = "http://localhost:3002";
// console.log(process.env.NODE_ENV === "development")
// console.log(baseUrl);
console.log(process.env.REACT_APP_ENV);
const baseHeaders = {};

type RequestParamsType = {
    url : string,
    method : string,
    data : any,
    loginRequired : boolean,
    accessToken : string | "",
}
const sendRequest = (url : string, method : string, data : any, loginRequired = false, accessToken = "") => {
    const finalUrl = `${baseUrl}/${url}`;
    if (loginRequired === true){
        return axios({
            url : finalUrl,
            method : method,
            data : data, 
            headers : {
                Authorization : `Bearer ${accessToken}`,
            },
            withCredentials : true,

        }).then(res => res.data);
    }
    return axios({
            url : finalUrl,
            method : method,
            data : data,
            withCredentials : true,
    }).then(res => res.data);
}
export default sendRequest;