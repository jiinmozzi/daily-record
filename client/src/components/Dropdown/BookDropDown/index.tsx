import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

import "./BookDropDown.scss";
import { BookType } from "../../../types";
type BookDropDownType = {
    suggestions : BookType[],
    bookTitle : string
}


const BookDropDown = ({suggestions, bookTitle} : BookDropDownType) => {
    const navigate = useNavigate();
    useEffect(() => {
        console.log(suggestions);
    }, [suggestions])
    return (
        <div className="book-dropdown-wrapper">
            {suggestions && 
                <div className="suggestion-dropdowns">
                    
                    {suggestions.map((e : BookType) => <div className="book-suggestionon" onClick={() => navigate(`/book/${e.isbn ? e.isbn : "empty-result"}`)}>{e.title}</div> ) }
                </div>
            }
        </div>
    )
}

export default BookDropDown;