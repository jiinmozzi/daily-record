import sendRequest from './sendRequest'
const getWishlists = async(token : string) => {
    return await sendRequest('bucketlist/wishlists', 'GET', {}, true, token);
}

export default getWishlists;