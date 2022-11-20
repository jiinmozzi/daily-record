import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

import TravelCard from "../../Card/TravelCard";

import "./TravelStoryList.scss";

type WishListStoryType = {
    country : string,
    city : string,
    imageUrl : string[],
    title : string,
    comment : string,
}

type VisitedCountryStoryType = {
    country : string,
    city : string,
    imageUrl : string,
    title : string,
    comment : string,
    departureDate : Date,
    arrivalDate : Date,
    duration : number,
}
type TravelStoryListPropsType = {
    visited : boolean,
    travelStories : WishListStoryType[] | VisitedCountryStoryType[]
}

const TravelStoryList = ({travelStories, visited} : TravelStoryListPropsType) => {
    const [title, setTitle] = useState<string>("");
    useEffect(() => {
        if (visited === true) setTitle("여행 스토리");
        else setTitle("위시 스토리");
    }, [visited])
    return (
        <div className="travel-story-list-wrapper">
            <div id="travel-cards-title">{title}</div>
            <div id="travel-cards-wrapper">
                <TravelCard />
            </div>
        </div>
    )
}

export default TravelStoryList;