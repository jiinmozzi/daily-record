import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";

import "./BookDropDown.scss";
import { BookType } from "../../../types";
type BookDropDownType = {
    suggestions : BookType[],
    bookTitle : string
    showDropDown : boolean,
    setShowDropDown : (bool : boolean) => void,
}


const BookDropDown = ({suggestions, bookTitle, showDropDown, setShowDropDown} : BookDropDownType) => {
    const navigate = useNavigate();
    
    useEffect(() => {
        console.log(suggestions);
    }, [suggestions]);

    const onMouseDown = (e : React.MouseEvent) => {
        e.preventDefault();
    }
    const onClickBookDropDown = (event : React.MouseEvent, isbn : string) => {
        navigate(`/book/${isbn ? isbn : "empty-result"}`)
        setShowDropDown(false);
    }
    return (
        <div className="book-dropdown-wrapper" onMouseDown={onMouseDown} style={{height : suggestions.length > 0 ? "400px" : "100px"}}>
            {suggestions && 
                <div className="suggestion-dropdowns-wrapper">
                    {suggestions.map((e : BookType) => 
                        <div className="book-suggestion" onClick={(event) => onClickBookDropDown(event, e.isbn)}>
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
            {suggestions.length === 0 && <div id="book-suggestion-dropdown-empty">검색결과가 없습니다.</div>}
        </div>
    )
}

export default BookDropDown;
