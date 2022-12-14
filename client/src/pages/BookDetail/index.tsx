import React, {useState, useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
import getBookWithTitle from "../../api/getBookWithTitle";
import { useParams } from "react-router-dom";
import { BookType, UserType } from "../../types";
import SearchedBookCard from "../../components/Card/SearchedBookCard";
import BookSearchBar from "../../components/SearchBar/BookSearchBar";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FavoriteIcon from '@mui/icons-material/Favorite';

import "./BookDetail.scss";
import getBookWithISBN from "../../api/getBookWithISBN";
import setBookToLibrary from "../../api/setBookToLibrary";
import { useRecoilState } from "recoil";
import { accessTokenState, userState } from "../../store/atom";
import setBookToBookmark from "../../api/setBookToBookmark";
import { Alert } from "@mui/material";
import getUserBooks from "../../api/getUserBooks";
const BookDetail = () => {
    const summayRef = useRef<HTMLTextAreaElement>(null);
    const feelingsRef = useRef<HTMLTextAreaElement>(null);
    const quotesRef = useRef<HTMLTextAreaElement>(null);
    const params = useParams();
    const [showDropDown, setShowDropDown] = useState<boolean>(false);
    const [bookISBN, setBookISBN] = useState<string>("");
    const [suggestions, setSuggestions] = useState<BookType[]>([]);
    const [book, setBook] = useState<any>(null);
    const [accessToken, setAccessToken] = useRecoilState<string>(accessTokenState);
    const [user, setUser] = useRecoilState<UserType>(userState);
    const [addedLibrary, setAddedLibrary] = useState<boolean>(false);
    const [addedBookmark, setAddedBookmark] = useState<boolean>(false);
    const [userBooks, setUserBooks] = useState<any[]>([]);
    
    useEffect(() => {
        if (accessToken){
            const fetchUserBooks = async() => await getUserBooks(accessToken);
            fetchUserBooks().then(res => setUserBooks(res.data));
        }
    }, [accessToken])
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

    const addBookToLibrary = async(e : React.MouseEvent) => {
        const {authors, title, contents, datetime, price, thumbnail, isbn} = book;
        const res = await setBookToLibrary(accessToken, {authors, title, contents, datetime, price, thumbnail, isbn})
        if (res.message === "OK"){
            setAddedLibrary((prev) => !prev);
            setTimeout(() => {
                setAddedLibrary((prev) => !prev);
            }, 2000)
        }
    }
    
    const addBookToBookmark = async(e : React.MouseEvent) => {
        const {authors, title, contents, datetime, price, thumbnail, isbn} = book;
        const res = await setBookToBookmark(accessToken, {authors, title, contents, datetime, price, thumbnail, isbn})
        if (res.message === "OK"){
            setAddedBookmark((prev) => !prev);
            setTimeout(() => {
                setAddedBookmark((prev) => !prev);
            }, 2000)
        }
    }
    
    const submitBookReport = (e : React.MouseEvent) => {
        
    }

    return (
        <div className="book-detail-wrapper">
            <BookSearchBar showDropDown={showDropDown} setShowDropDown={setShowDropDown}/>
            {(bookISBN === "" || !book) ? <div id="empty-result-book">검색 결과가 없습니다.</div> : (
                <>
            <span className="book-detail-page-explanation">"{book.title}" 검색 결과입니다.</span>
            { addedLibrary && <Alert className="alert-msg" severity="success">서재에 성공적으로 추가되었습니다.</Alert>}
            { addedBookmark && <Alert className="alert-msg" severity="success">북마크에 성공적으로 추가되었습니다.</Alert> }
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
                        <button className="book-user-control-btn" onClick={addBookToLibrary}>
                            <MenuBookIcon className="menu-book-icon"/>
                            &nbsp;
                            서재 추가
                        </button>
                        <button className="book-user-control-btn" onClick={addBookToBookmark}>
                            <FavoriteIcon className="favorite-icon"/>
                            &nbsp;
                            관심 추가
                        </button>
                    </div>
                </div>
                
            </div>
            <div className="book-report-wrapper">
                <h5 id="book-report-title">독서록</h5>
                <div id="book-report-username">{user.name}</div>

                <div id="book-report-container">
                    <div id="book-title" className="book-report-header">
                        <div className="book-report-header-text">제목</div>
                        <div className="book-report-header-content">{book.title}</div>
                    </div>
                    <div id="book-author" className="book-report-header">
                        <div className="book-report-header-text">글쓴이</div>
                        <div className="book-report-header-content">{book.authors.toString()}</div>
                    </div>
                    <div id="book-genre" className="book-report-header">
                        <div className="book-report-header-text">장르</div>
                        <input type="text" id="book-report-genre-input" className="book-report-header-content"/>
                    </div>
                    <div id="book-date" className="book-report-header">
                        <div className="book-report-header-text">읽기 시작한 날짜</div>
                        <input type="date" className="book-report-header-content" id="book-report-date-input"/>
                    </div>
                </div>
                <div className="book-report-plot-wrapper">
                    <h5 className="book-report-plot-text">📜 &nbsp;&nbsp;줄거리 요약</h5>
                    <textarea id="book-report-plot-textarea"></textarea>
                </div>
                <div className="book-report-plot-wrapper">
                    <h5 className="book-report-plot-text">🔖 &nbsp;&nbsp;느낀점</h5>
                    <textarea id="book-report-plot-textarea"></textarea>
                </div>
                <div className="book-report-plot-wrapper">
                    <div className="book-report-plot-text">💕 &nsbp;&nbsp;마음에 드는 문장</div>
                    <textarea id="book-report-plot-textarea" placeholder="ex) p 13. 한 여름날.."></textarea>
                </div>
                
                <button id="book-report-submit-btn" onClick={submitBookReport}></button>
            </div>
            </>
            )}
            
       </div>
    )
}

export default BookDetail;