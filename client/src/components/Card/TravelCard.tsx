import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./TravelCard.scss";
import mongol from "../../assets/mongol.jpeg";
const TravelCard = () => {
    const navigate = useNavigate();

    return (
        <div className="travel-card-wrapper" onClick={() => navigate('/')}>
            <div className="travel-card-image" style={{backgroundImage : `url(${mongol})`}}></div>
            <div className="travel-card-summary">
                <span className="country">Mongol</span>
                <span className="city">Sahara</span>
                <br/>
                <span className="date">2022.8.10~2022.8.22</span>
            </div>
        </div>
    )
}

export default TravelCard;