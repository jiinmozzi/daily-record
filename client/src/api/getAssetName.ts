import sendRequest from "./sendRequest"
const getAssetName = async(ticker : string) => {
    return await sendRequest(`asset/fullname/${ticker}`, 'GET', {}, false);
}

export default getAssetName;