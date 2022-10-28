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


const setBookToLibrary = async(token : string, {authors, title, contents, datetime, price, thumbnail} : BookType ) => {
    return await sendRequest('book/create/library', "POST", {authors, title, contents, datetime, price, thumbnail}, true, token);
}

export default setBookToLibrary;
