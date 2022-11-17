import sendRequest from "./sendRequest"

const getUserAssetPortfolio = async(token : string) => {
    return await sendRequest(`asset/portfolio`, "GET", {}, true, token);
}

export default getUserAssetPortfolio;