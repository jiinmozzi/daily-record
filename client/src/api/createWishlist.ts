import sendRequest from "./sendRequest"

type WishListType = {
    imageUrl  : string,
    title : string,
    comment : string,
    field : string,
    isCompleted : boolean,
    isPublic : boolean
}
const createWishlist = async(token : string, {imageUrl, title, comment, field, isCompleted=false, isPublic=false} : WishListType) => {
    return await sendRequest('bucketlist/wishlist', 'POST', {imageUrl, title, comment, field, isCompleted, isPublic}, true, token);
}

export default createWishlist;