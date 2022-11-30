import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import getBookWishlists from "../../api/getBookWishlists";
import BookSearchBar from "../../components/SearchBar/BookSearchBar";
import { accessTokenState } from "../../store/atom";

import "./BookMarked.scss";

const BookMarked = () => {
    const [accessToken, setAccessToken] = useRecoilState<string>(accessTokenState);
    const [showDropDown, setShowDropDown] = useState<boolean>(false);
    const [bookLists, setBookLists] = useState<any[]>([]);
    useEffect(() => {
        if (accessToken){
            const fetchBookWishlists = async () => {
                return await getBookWishlists(accessToken);
            }
            fetchBookWishlists().then(res => console.log(res));
        }
    }, [accessToken])
    return (
        <div className="bookmarked-wrapper">
            <BookSearchBar showDropDown={showDropDown} setShowDropDown={setShowDropDown}/>
            <div id="bookmarked-description">내 서재</div>
            <div id="bookmarked-lists">
                <div id="bookmarked-controller-wrapper">
                    <div id="bookmarked-delete-btn">선택도서 삭제</div>
                </div>
                <div id="bookmarked-lists-header">
                    <div className="bookmarked-lists-header-checkboxs">
                        <input type="checkbox" />
                    </div>
                    <span id="bookmarked-header-info">도서 정보</span>
                    <span id="bookmarked-header-price">도서 가격</span>
                </div>
            </div>
            {bookLists.map((e:any) => {
                return (
                    <div className="bookmarked-book">
                        <div className="bookmarked-lists-header-checkboxs">
                            <input type="checkbox" />
                        </div>
                        <div></div>
                    </div>
                )
            })}
        </div>
    )
}
export default BookMarked;