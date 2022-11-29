import sendRequest from "./sendRequest"

type CreateTerminalStudyPropsType = {
    classification : string,
    title : string,
    content : string,
    githubLink : string,
    siteUrl : string, 
    imageUrl : string, 
    isCompleted : string,
    isPublic : boolean
}

const createTerminalStudy = async(token : string, {classification, title, content, githubLink, siteUrl, imageUrl, isCompleted, isPublic} : CreateTerminalStudyPropsType) => {
    return await sendRequest('terminal/daily', 'POST', {classification, title, content, githubLink, siteUrl, imageUrl, isCompleted, isPublic}, true, token)
}

export default createTerminalStudy;
