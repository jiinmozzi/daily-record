import axios from "axios";


const baseUrl = process.env.NODE_ENV === 'production' 
    ? process.env.REACT_APP_PRODUCTION_URL
    : process.env.REACT_APP_DEVELOPMENT_ENV;

const baseHeaders = {};

type RequestParamsType = {
    url : string,
    method : string,
    data : any,
    loginRequired : boolean,
    accessToken : string | "",
}
const sendRequest = (url : string, method : string, data : any, loginRequired = false, accessToken = "") => {
    // let queryString : string = "";
    // let finalUrl = baseUrl;
    // if ( url !== "" ){
    //     finalUrl += "/" + url;
    // }
    const finalUrl = `${baseUrl}/${url}`;

    // if (loginRequired) {
    //     return axios({ url : finalUrl , method : method, data : data, withCredentials : true}).then((res) => res.data);
    // }
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