import sendRequest from "./sendRequest"

const getUserPortfolio = async(token : string) => {
    return await sendRequest(`asset/portfolio`, "GET", {}, true, token);
}

export default getUserPortfolio;