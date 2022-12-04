import sendRequest from "./sendRequest";

type UserAssetType = {
    ticker : string,
    quantity : number,
    price : number,
}

const purchaseStockAsset = async(token : string, {ticker, quantity, price} : UserAssetType) => {
    return await sendRequest('asset/purchase/stock', "POST", {ticker, quantity, price}, true, token);
}

export default purchaseStockAsset;