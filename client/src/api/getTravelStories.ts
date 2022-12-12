import sendRequest from "./sendRequest";

const getTravelStories = async(token : string) => {
    return sendRequest("travel/stories", "GET", {}, true, token);
}

export default getTravelStories;