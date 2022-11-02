import axios from "axios";
import {useState, useEffect} from "react";
import BookSearchBar from "../../components/SearchBar/BookSearchBar";
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import "./Book.scss";
import MyBookCard from "../../components/Card/MyBookCard";

const Book = () => {
    const [searched, setSearched] = useState<boolean>(false);

    return (
        // 나중에 search modal hidden 관련 로직은 다 book-search-wrapper 쪽으로 빼세요.
        <div className="book-wrapper">
                
                <BookSearchBar />
                <MyBookCard />
        </div>
    )
}
export default Book;