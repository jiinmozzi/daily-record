import sendRequest from "./sendRequest"

type SaveAssetMBTIPropsType = {
    assetMBTI : string,
}

const saveAssetMBTI = async(token : string, {assetMBTI} : SaveAssetMBTIPropsType ) => {
    return await sendRequest('asset/mbti', 'POST', {assetMBTI}, true, token)
}

export default saveAssetMBTI;