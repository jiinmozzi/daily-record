import axios from "axios";

const baseUrl = "http://localhost:3002";
const baseHeaders = {};

type RequestParamsType = {
    url : string,
    method : string,
    data : any
    loginRequired : boolean
}
const sendRequest = (url : string, method : string, data : any, loginRequired = false) => {
    let queryString : string = "";
    if (method === "GET"){
        queryString += Object.entries(data).filter(e => e[0] !== "accessToken")
                        .map(e => e.join("=")).join("&");
    }
    
    const finalUrl = queryString ? `${baseUrl}/${url}?${queryString}` : `${baseUrl}/${url}`;

    const methodType = method === "POST" || method === "PUT";

    if (loginRequired) {
        return axios({ url : finalUrl , method : method, data : methodType ? data : {accessToken : data.accessToken}, withCredentials : true}).then((res) => res.data);
    }

    return axios({
            url : finalUrl,
            method : method,
            data : methodType ? data : "",
            withCredentials : true,
    }).then(res => res.data);
}
export default sendRequest;