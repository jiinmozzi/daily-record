import sendRequest from "./sendRequest"
const getBookWishlists = async(token : string) => {
    return await sendRequest('book/books/wishlists', 'GET', {}, true, token);
}

export default getBookWishlists;