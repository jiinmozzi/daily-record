import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import getBookWithTitle from "../../api/getBookWithTitle";
import { useParams } from "react-router-dom";
import { BookType } from "../../types";
import SearchedBookCard from "../../components/Card/SearchedBookCard";
import BookSearchBar from "../../components/SearchBar/BookSearchBar";

import "./BookSearch.scss";
const BookSearch = () => {
    const params = useParams();
    const [bookTitle, setBookTitle] = useState<string>("");
    const [suggestions, setSuggestions] = useState<BookType[]>([]);
    useEffect(() => {
        if (params.bookTitle) {
            setBookTitle(params.bookTitle);
        }
    }, [])    

    useEffect(() => {
        console.log(bookTitle)
        if (bookTitle !== "" && bookTitle !== undefined ){
            const getBook = async() => {
                return await getBookWithTitle(params.bookTitle ? params.bookTitle : "");
            }
            getBook().then(res => setSuggestions(res.data.documents));
        }
    }, [bookTitle])
    useEffect(() => {
        console.log(suggestions);
    }, [suggestions])
    return (
        <div className="book-search-wrapper">
            <BookSearchBar />
            <span className="book-search-page-explanation">{bookTitle} 검색 결과입니다.</span>
            { bookTitle !== "" && suggestions.length !== 0 && suggestions.map((e : BookType) => {
                return (
                <SearchedBookCard authors={e.authors} title={e.title} contents={e.contents} price={e.price} thumbnail={e.thumbnail} datetime={e.datetime}/>
                )
            })}
            
            {(bookTitle === "" || suggestions.length === 0) && <div>검색 결과가 없습니다.</div> }
       </div>
    )
}

export default BookSearch;