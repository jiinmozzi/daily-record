import sendRequest from "./sendRequest";

type UserAssetType = {
    ticker : string,
    quantity : number,
    price : number,
}

const sellStockAsset = async(token : string, {ticker, quantity, price} : UserAssetType) => {
    return await sendRequest('asset/sell/stock', "POST", {ticker, quantity, price}, true, token);
}
export default sellStockAsset;