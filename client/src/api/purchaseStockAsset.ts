import sendRequest from "./sendRequest";

type UserAssetType = {
    ticker : string,
    quantity : number,
    price : number,
    currency : string,
    exchangeRate : number | null,
}

const purchaseStockAsset = async(token : string, {ticker, quantity} : UserAssetType) => {
    return await sendRequest('asset/purchase/stock', "POST", {ticker, quantity}, true, token);
}

export default purchaseStockAsset;