import sendRequest from './sendRequest'
const getBucketlists = async(token : string) => {
    return await sendRequest('bucketlist/bucketlists', 'GET', {}, true, token);
}

export default getBucketlists;