import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import setBookToLibrary from "../../../api/setBookToLibrary";
import "./SearchedBookCard.scss";
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../store/atom";

type Book = {
    authors : string[],
    title : string,
    contents : string,
    datetime : string,
    price : number,
    thumbnail : string,
    isbn : string,
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const SearchedBookCard = ({authors, title, contents, datetime, price, thumbnail, isbn} : Book) => {
    const [accessToken, setAccessToken] = useRecoilState<string>(accessTokenState);
    const onClickToLibrary = async(e : React.MouseEvent) => {
        setBookToLibrary(accessToken, {authors, title, contents, datetime, price, thumbnail, isbn}).then(res => console.log(res));
       
    }
    return (
        <div className="searched-book-card-wrapper">
            <img className="searched-book-image" src={thumbnail} alt={title}/>
            <div className="searched-book-main">
                <div className="searched-book-title">{title.length > 25 ? title.slice(0, 25) + '...' : title}</div>
                <div className="searched-book-author">저자 : {authors.join(', ')} &nbsp;&nbsp; | &nbsp;&nbsp; 출간일 : {datetime.slice(0, 10 )}</div>
                <div className="searched-book-content">내용 : {contents.length > 90 ? contents.substring(0, 90) + "..." : contents}</div>
                <div className="searched-book-price">가격 : {price}원</div>
            </div>
            <div className="searched-book-navs">
                <div className="searched-book-icon-wrapper">
                    <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                    <span className="searched-book-icon-span">관심 목록에 추가</span>
                </div>
                <div className="searched-book-icon-wrapper" onClick={onClickToLibrary}>
                    <Checkbox
                        {...label}
                        icon={<BookmarkBorderIcon />}
                        checkedIcon={<BookmarkIcon />}
                    />
                    <span className="searched-book-icon-span">내 서재에 추가</span>
                </div>
                
            </div>
        </div>
    )
}

export default SearchedBookCard;