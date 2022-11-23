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
    useEffect(() => {}, [])
    return (
        
        <div className="book-dropdown-wrapper">
            {suggestions && bookTitle.length > 0 && 
                <div className="suggestion-dropdowns-wrapper">
                    {suggestions.map((e : BookType) => 
                        <div className="book-suggestion" onClick={() => navigate(`/book/${e.isbn ? e.isbn : "empty-result"}`)}>
                            <img className="book-dropdown-img"src={e.thumbnail} alt={e.title} />
                            <div className="suggestion-dropdown-main">
                                <div className="suggestion-dropdown-title">{e.title.length > 20 ? e.title.slice(0, 20) + "..." : e.title}</div>
                                <div className="suggestion-dropdown-author">{e.authors[0]}</div>
                                <div className="suggestion-dropdown-price">{e.price}원</div>
                            </div>
                            
                        </div> 
                        )}
                </div>
            }
            
        </div>
    )
}

export default BookDropDown;