import sendRequest from "./sendRequest";

const getTravelStories = async(token : string) => {
    return sendRequest("stories", "GET", {}, true, token);
}

export default getTravelStories;