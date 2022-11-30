import sendRequest from "./sendRequest"

const getUserEmoji = async(token : string) => {
    return await sendRequest('diary/emoji', 'GET', {}, true, token);
}

export default getUserEmoji;