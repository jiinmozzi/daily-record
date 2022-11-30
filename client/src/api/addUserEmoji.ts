import sendRequest from "./sendRequest";

type EmojiType = {
    emoji : string
}

const addUserEmoji = async(token : string, {emoji} : EmojiType) => {
    return await sendRequest('diary/emoji', 'POST', {emoji}, true, token);
}

export default addUserEmoji;