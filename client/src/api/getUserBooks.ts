import sendRequest from "./sendRequest";

const getUserBooks = async( token : string ) => {
    return await sendRequest('book/books', 'GET', {}, true, token);
}

export default getUserBooks;