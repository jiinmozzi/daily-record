import sendRequest from "./sendRequest"

type ToggelBucketlistType = {
    isBucketlist : boolean,
    _id : string,
}
const toggleBucketlist = async( token : string, {isBucketlist, _id} : ToggelBucketlistType) => {
    if (isBucketlist){
        return await sendRequest('bucketlist/bucketlist/toggle', 'POST', {_id}, true, token);
    }   else {
        return await sendRequest('bucketlist/wishlist/toggle', 'POST', {_id}, true, token); 
    }
    
}

export default toggleBucketlist;