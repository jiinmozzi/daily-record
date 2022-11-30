import sendRequest from "./sendRequest"

type CreateDiaryFormType = {
    date : Date,
    title : string,
    content : string,
    emoji : string,
    isPublic : boolean,
}
const createDiary = async(token : string, {date, title, content, emoji, isPublic} : CreateDiaryFormType) => {
    return await sendRequest("diary/diary", "POST", {date, title, content, emoji, isPublic}, true, token)
}

export default createDiary