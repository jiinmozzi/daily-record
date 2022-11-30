import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

import "./NewsCard.scss";

type NewsCardPropsType = {
    title : string,
    author : string,
    description : string,
    publishedAt : Date,
    url : string,
    urlToImage : string,
}

const NewsCard = ({title, author, description, publishedAt, url, urlToImage} : NewsCardPropsType) => {
    
    useEffect(() => {
        console.log(urlToImage);
    }, [])
    return (
        <div className="news-card-wrapper">
            <img className="news-card-thumbnail" src={urlToImage} alt="thumbnail" onClick={() =>  window.open(url, '_blank', 'noopener,noreferrer')}/>
            <div className="news-card-title">{title.length > 90 ? title.slice(0, 90) + "..." : title}</div>
            <div className="news-card-author">- {author}</div>
        </div>
    )
}

export default NewsCard;