import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import getBookWithTitle from "../../api/getBookWithTitle";
import { useParams } from "react-router-dom";
import { BookType } from "../../types";
import SearchedBookCard from "../../components/Card/SearchedBookCard";
import BookSearchBar from "../../components/SearchBar/BookSearchBar";

import "./BookDetail.scss";
import getBookWithISBN from "../../api/getBookWithISBN";
const BookDetail = () => {
    const params = useParams();
    const [bookISBN, setBookISBN] = useState<string>("");
    const [suggestions, setSuggestions] = useState<BookType[]>([]);
    const [book, setBook] = useState<any>(null);
    useEffect(() => {
        if (params.isbn) {
            setBookISBN(params.isbn);
        }
    }, [])    

    useEffect(() => {
        console.log(bookISBN)
        if (bookISBN !== "" && bookISBN !== undefined ){
            const getBook = async() => {
                return await getBookWithISBN(bookISBN ? bookISBN.split(' ')[0] : "");
            }
            
            getBook().then((res : any) => {
                setBook(res.data.documents[0]);
            });
        }
    }, [bookISBN])
    useEffect(() => {
        console.log(suggestions);
    }, [suggestions])
    return (
        <div className="book-search-wrapper">
            <BookSearchBar />
            <span className="book-search-page-explanation">{bookISBN} 검색 결과입니다.</span>
            { bookISBN !== "" && book && <SearchedBookCard authors={book.authors} title={book.title} contents={book.contents} price={book.price} thumbnail={book.thumbnail} datetime={book.datetime} isbn={book.isbn}/> }
            
            {(bookISBN === "" || !book) && <div>검색 결과가 없습니다.</div> }
       </div>
    )
}

export default BookDetail;