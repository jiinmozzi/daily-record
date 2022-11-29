import sendRequest from "./sendRequest"

type CreateTerminalDailyPropsType = {
    title : string,
    content : string,
    siteUrl : string, 
    imageUrl : string, 
    isPublic : boolean
}

const createTerminalDaily = async(token : string, {title, content, siteUrl, imageUrl, isPublic} : CreateTerminalDailyPropsType) => {
    return await sendRequest('terminal/daily', 'POST', {title, content, siteUrl, imageUrl, isPublic}, true, token)
}

export default createTerminalDaily