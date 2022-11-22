import React, {useState, useEffect, useCallback, useMemo} from "react";
import {useNavigate} from "react-router-dom";
import { useRef } from "react";
import { debounce } from "lodash";

import getBookWithTitle from "../../../api/getBookWithTitle";

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import BookDropDown from "../../DropDown/BookDropDown";
import { BookType } from "../../../types";
import books from "../../../assets/books.jpeg";

import "./BookSearchBar.scss";

const BookSearchBar = () => {
    const [bookTitle, setBookTitle] = useState<string>("");
    const [isbn, setIsbn] = useState<string>("");
    const [suggestions, setSuggestions] = useState<BookType[]>([]);
    const navigate = useNavigate();
    const bookRef = useRef();

    const fetchBooks = (e : React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        getBookWithTitle(target.value).then(res => setSuggestions(res.data.documents));
    }
    const debounceChangeHandler = useCallback(
        debounce(fetchBooks, 200), []
    )

    const onKeyDown = (e : React.KeyboardEvent) => {
        const target = e.target as HTMLInputElement;
        setBookTitle(target.value);
    }
    useEffect(() => {
        if (suggestions.length > 0 && suggestions[0] && suggestions[0].isbn)
        setIsbn(suggestions[0].isbn);
    }, [suggestions])

    return (
        <div className="book-search-bar-wrapper">
            <Paper
                id="input-paper"
                component="form"
                className="paper"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 500 }}
                onSubmit={() => navigate(`/book/${isbn ? isbn : "empty-result"}`)}
                // onSubmit={onSubmit}
            >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Books"
                inputProps={{ 'aria-label': 'search books ' }}
                onChange={debounceChangeHandler}
                onKeyDown={onKeyDown}                
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={() => navigate(`/book/${isbn ? isbn : "empty-result"}`)}>
                <SearchIcon />
            </IconButton>
                
            </Paper>
            <BookDropDown suggestions={suggestions} bookTitle={bookTitle}/>
            
        </div>
    )
}

export default BookSearchBar;