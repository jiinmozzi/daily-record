import sendRequest from "./sendRequest"
import axios from "axios";

const getUserAssetPortfolio = async(token : string) => {
    return await sendRequest(`asset/portfolio`, "GET", {}, true, token);
}

export default getUserAssetPortfolio;