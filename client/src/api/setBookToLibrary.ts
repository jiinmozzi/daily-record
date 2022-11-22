import sendRequest from "./sendRequest";
import { BookType } from "../types";
import {UsersBookType} from "../types";
// type BookType = {
//     authors : string[],
//     title : string,
//     contents : string,
//     datetime : string,
//     price : number,
//     thumbnail : string,
// }


const setBookToLibrary = async(token : string, {authors, title, contents, datetime, price, thumbnail, isbn} : BookType ) => {
    return await sendRequest('book/library', "POST", {authors, title, contents, datetime, price, thumbnail, isbn}, true, token);
}

export default setBookToLibrary;
