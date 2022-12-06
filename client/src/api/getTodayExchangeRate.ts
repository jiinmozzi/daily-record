import sendRequest from "./sendRequest";

const getTodayExchangeRate = async() => {
    return await sendRequest('asset/today/exchange', 'GET', {}, false);
}

export default getTodayExchangeRate;