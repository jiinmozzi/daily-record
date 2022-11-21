import sendRequest from "./sendRequest"

type PatchSchedulePropsType = {
    title : string,
    content : string,
    id : string,
}

const patchSchedule = async ( token : string, {id, title, content} : PatchSchedulePropsType) => {
    return await sendRequest(`schedule/schedule/${id}`, 'PATCH', {title, content}, true, token);
}

export default patchSchedule;