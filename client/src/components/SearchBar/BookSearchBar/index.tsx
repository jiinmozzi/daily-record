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

import { BookType } from "../../../types";
import books from "../../../assets/books.jpeg";

import "./BookSearchBar.scss";

const BookSearchBar = () => {
    const [bookTitle, setBookTitle] = useState<string>("");
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
        console.log(suggestions); 
    }, [suggestions])
    return (
        <div className="book-search-bar-wrapper" style={{ backgroundImage : `url(${books})`}}>
            <Paper
                component="form"
                className="paper"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                onSubmit={() => navigate(`/book/${bookTitle ? bookTitle : "empty-result"}`)}
                // onSubmit={onSubmit}
            >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Books"
                inputProps={{ 'aria-label': 'search books ' }}
                onChange={debounceChangeHandler}
                onKeyDown={onKeyDown}                
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={() => navigate(`/book/${bookTitle ? bookTitle : "empty-result"}`)}>
                <SearchIcon />
            </IconButton>
                
            </Paper>
            {suggestions && 
                <div className="suggestion-dropdowns">
                    {suggestions.map((e : BookType) => <div className="book-suggestion">{e.title}</div> ) }
                </div>
            }
        </div>
    )
}

export default BookSearchBar;