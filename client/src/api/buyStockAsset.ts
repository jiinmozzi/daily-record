import sendRequest from "./sendRequest";

type UserAssetType = {
    ticker : string,
    quantity : number,
    price : number,
    currency : string,
    exchangeRate : number | null,
}

const buyStockAsset = async(token : string, {ticker, quantity} : UserAssetType) => {
    return await sendRequest('asset/add/stock', "POST", {ticker, quantity}, true, token);
}

export default buyStockAsset;