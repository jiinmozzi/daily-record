import sendRequest from "./sendRequest"

type CreateTerminalPortfolioPropsType = {
    dateFrom : Date,
    dateTo : Date,
    title : string,
    content : string,
    githubLink : string, 
    siteUrl : string, 
    imageUrl : string, 
    isCompleted : boolean, 
    onProcess : string, 
    isPublic : boolean
}

const createTerminalPortfolio = async( token : string, {dateFrom, dateTo, title, content, githubLink, siteUrl, imageUrl, isCompleted, onProcess, isPublic} : CreateTerminalPortfolioPropsType ) => {
    return await sendRequest('terminal/portfolio', 'POST', {dateFrom, dateTo, title, content, githubLink, siteUrl, imageUrl, isCompleted, onProcess, isPublic}, true, token);
}

export default createTerminalPortfolio