import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import getBookWithTitle from "../../api/getBookWithTitle";
import { useParams } from "react-router-dom";
import { BookType } from "../../types";
import SearchedBookCard from "../../components/Card/SearchedBookCard";
import BookSearchBar from "../../components/SearchBar/BookSearchBar";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FavoriteIcon from '@mui/icons-material/Favorite';

import "./BookDetail.scss";
import getBookWithISBN from "../../api/getBookWithISBN";
const BookDetail = () => {
    const params = useParams();
    const [showDropDown, setShowDropDown] = useState<boolean>(false);
    const [bookISBN, setBookISBN] = useState<string>("");
    const [suggestions, setSuggestions] = useState<BookType[]>([]);
    const [book, setBook] = useState<any>(null);
    useEffect(() => {
        if (params.isbn) {
            setBookISBN(params.isbn);
        }
    }, [params])    

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
        console.log(book);
    }, [book])
    return (
        <div className="book-detail-wrapper">
            <BookSearchBar showDropDown={showDropDown} setShowDropDown={setShowDropDown}/>
            {(bookISBN === "" || !book) ? <div id="empty-result-book">검색 결과가 없습니다.</div> : (
                <>
            <span className="book-detail-page-explanation">"{book.title}" 검색 결과입니다.</span>
            <div className="book-detail-contents-container">
                <img id="book-detail-thumbnail" src={book.thumbnail} alt="thumbnail" />
                <div id="book-detail-contents">
                    <div className="book-detail-content" id="book-detail-content-title">
                        <span className="book-detail-text">제목</span>
                        <span className="book-detail-info">{book.title}</span>
                    </div>
                    <div className="book-detail-content" id="book-detail-content-contents">
                        <span className="book-detail-text">내용</span>
                        <span className="book-detail-info">{book.contents.length > 250 ? book.contents.slice(0, 250) + "..." : book.contents }</span>
                    </div>
                    <div className="book-detail-content" id="book-detail-content-author">
                        <span className="book-detail-text">저자</span>
                        <span className="book-detail-info">{book.authors.toString()}</span>
                    </div>
                    <div className="book-detail-content" id="book-detail-content-date">
                        <span className="book-detail-text">출간일</span>
                        <span className="book-detail-info">{book.datetime.toString().split('T')[0]}</span>
                    </div>
                    <div id="book-user-controller">
                        <button className="book-user-control-btn">
                            <MenuBookIcon className="menu-book-icon"/>
                            &nbsp;
                            서재 추가
                        </button>
                        <button className="book-user-control-btn">
                            <FavoriteIcon className="favorite-icon"/>
                            &nbsp;
                            관심 추가
                        </button>
                    </div>
                </div>
                
            </div>
            
            </>
            )}
       </div>
    )
}

export default BookDetail;