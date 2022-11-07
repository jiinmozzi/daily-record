import sendRequest from "./sendRequest"

const getAssetInfo = async(ticker : string) => {
    return await sendRequest(`asset/${ticker}`, "GET", {}, false);
}

export default getAssetInfo;