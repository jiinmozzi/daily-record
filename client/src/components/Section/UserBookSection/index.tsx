import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../../store/atom";
import { UserType } from "../../../types";

import bookshelf from "../../../assets/bookshelf.jpg";
import book1 from "../../../assets/book1.jpeg";
import book2 from "../../../assets/book2.jpeg";
import book3 from "../../../assets/book3.jpeg";

import "./UserBookSection.scss";

const UserBookSection = () => {
    const [user, setUser] = useRecoilState<UserType>(userState);
    useEffect(() => {
        console.log(user);
    }, [user])
    return (
        <div className="user-book-section-wrapper">
            <div id="user-book-bookmark-nav-wrapper">
                <button id="user-book-bookmark-navbtn" onClick={() => console.log('hi')}>관심 목록 가기</button>
            </div>
            
            <div id="user-book-library-collection">
                <div id="user-book-library-title-text">{user.name}님이 읽은 책들</div>
                <img className="bookshelf" src={bookshelf} alt="bookshelf" />
                <div className="user-library-books">
                    <img className="user-library-book" src={book1} alt="book1" />
                    <img className="user-library-book" src={book2} alt="book2" />
                    <img className="user-library-book" src={book3} alt="book3" />
                </div>
            </div>
            <div id="user-book-bookmark-collection"></div>
            
        </div>
    )
}

export default UserBookSection;