import sendRequest from "./sendRequest";

const getMarketCapRank = async() => {
    return await sendRequest('asset/marketcap', 'GET', {}, false);
}

export default getMarketCapRank;