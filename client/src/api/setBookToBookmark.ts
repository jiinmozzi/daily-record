import sendRequest from "./sendRequest";
import { BookType } from "../types";
import {UsersBookWishListType} from "../types";
// type BookType = {
//     authors : string[],
//     title : string,
//     contents : string,
//     datetime : string,
//     price : number,
//     thumbnail : string,
// }

const setBookToBookmark = async(token : string, {authors, title, contents, datetime, price, thumbnail, isbn} : BookType ) => {
    return await sendRequest('book/bookmark', "POST", {authors, title, contents, datetime, price, thumbnail, isbn}, true, token);
}

export default setBookToBookmark;
