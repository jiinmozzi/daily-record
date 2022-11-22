import sendRequest from "./sendRequest"

type PatchPortfolioPropsType = {
    dateFrom : Date,
    dateTo : Date,
    title : string,
    content : string,
    githubLink : string,
    siteUrl : string,
    imageUrl : string,
    onProcess : boolean,
    isPublic : boolean
}
const patchProgrammingPortfolio = async(token : string, id : string, {dateFrom, dateTo, title, content, githubLink, siteUrl, imageUrl, onProcess, isPublic } : PatchPortfolioPropsType) => {
    return await sendRequest(`portfolio/${id}`, 'PATCH', {}, true, token);
}

export default patchProgrammingPortfolio;