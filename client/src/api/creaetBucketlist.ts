import sendRequest from "./sendRequest";
type BucketlistFormType = {
    imageUrl : string,
    title : string,
    comment : string, 
    field : string,
    isCompleted : boolean,
    isPublic : boolean,
}
const createBucketlist = async(token : string, {imageUrl, title, comment, field, isCompleted = false, isPublic = true} : BucketlistFormType) => {
    return await sendRequest('bucketlist/bucketlist', 'POST', {imageUrl, title, comment, field, isCompleted, isPublic}, true, token)
}

export default createBucketlist;