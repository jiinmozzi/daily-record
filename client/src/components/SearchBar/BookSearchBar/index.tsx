import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import getBookWithTitle from "../../../api/getBookWithTitle";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

import "./BookSearchBar.scss";

const BookSearchBar = () => {
    const [bookTitle, setBookTitle] = useState<string>("");
    let searchTimer : any;

    useEffect(() => {
        const getBook = async() => {
            return await getBookWithTitle(bookTitle);
        } 
        // getBook().then(res => console.log(res.data));
    }, [])

    
    const onChange = (e : React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        
        if ( searchTimer ){
            clearTimeout(searchTimer);
        }
        
        searchTimer = setTimeout(() => {
            if (target.value !== ""){
                getBookWithTitle(target.value).then(res => console.log(res.data));
            }
        }, 200)
    }
    const onSubmit = ( e : React.FormEvent ) => {
        e.preventDefault();
        console.log(e.target);
    }
    return (
        <div className="book-search-bar-wrapper">
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                onSubmit={onSubmit}
            >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Books"
                inputProps={{ 'aria-label': 'search books ' }}
                onChange={onChange}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={onSubmit}>
                <SearchIcon />
            </IconButton>
            </Paper>
            
        </div>
    )
}

export default BookSearchBar;