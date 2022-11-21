import sendRequest from "./sendRequest"

const getStockInfo = async(ticker : string) => {
    return await sendRequest(`asset/${ticker}`, "GET", {}, false);
}

export default getStockInfo;