import sendRequest from "./sendRequest"

type CreateDiaryFormType = {
    date : Date,
    title : string,
    content : string,
    emojiCode : string,
    isPublic : boolean,
}
const createDiary = async(token : string, {date, title, content, emojiCode, isPublic} : CreateDiaryFormType) => {
    return await sendRequest("diary/diary", "POST", {date, title, content, emojiCode, isPublic}, true, token)
}

export default createDiary