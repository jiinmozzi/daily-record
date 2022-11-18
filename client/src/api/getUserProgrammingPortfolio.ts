import sendRequest from "./sendRequest";
const getUserProgrammingPortfolio = async(token : string) => {
    return await sendRequest('terminal/portfolio', "GET", {}, true, token)
}

export default getUserProgrammingPortfolio;