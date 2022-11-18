import sendRequest from "./sendRequest";

type UserAssetType = {
    ticker : string,
    quantity : number,
    price : number,
    currency : string,
    exchangeRate : number,
}

const sellStockAsset = async(token : string, {ticker, quantity} : UserAssetType) => {
    return await sendRequest('asset/sell/stock', "POST", {ticker, quantity}, true, token);
}
export default sellStockAsset;