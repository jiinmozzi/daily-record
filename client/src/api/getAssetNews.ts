import sendRequest from "./sendRequest";

const getAssetNews = async() => {
    return await sendRequest('asset/news', 'GET', {}, false);
}

export default getAssetNews;