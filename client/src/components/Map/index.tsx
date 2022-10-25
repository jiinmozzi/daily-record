import { red } from "@mui/material/colors";
import React, {useState, useEffect} from "react";
import { UserType } from "../../types";
import { useRecoilState } from "recoil";
import { accessTokenState, userState } from "../../store/atom";
import worldMap from "../../assets/map.json";
import getTravelHistory from "../../api/getTravelHistory";

import "./Map.scss";

type UsersTravelHistoryType = {
    visitedCountries : string[]
    wishListCountries : string[]
}

type SelectedCountryType = {
    selectedCountry : string,
    setSelectedCountry : any
    usersTravelHistory : UsersTravelHistoryType,
    setUsersTravelHistory : any,
}

const Map = ({selectedCountry, setSelectedCountry, usersTravelHistory, setUsersTravelHistory} : SelectedCountryType) => {
    const [clickedCountry, setClickedCountry] = useState<string>("");
    const [hoveredCountry, setHoveredCountry]= useState<string>("");
    const [user, setUser] = useRecoilState<UserType>(userState);
    const [accessToken, setAccessToken] = useRecoilState<string>(accessTokenState)
    const onMouseOverSea = ( e : React.MouseEvent ) => {
        if (hoveredCountry !== ""){
            setHoveredCountry((prev) => "");
        }
    }
    const onMouseOverCountry = ( e : React.MouseEvent ) => {
        const target = e.target as HTMLDivElement;
        if (target.className.split(' ')[1] !== hoveredCountry){
            setHoveredCountry((prev) => target.className.split(' ')[1]);
        }
    }
    const onClickCountry = ( e : React.MouseEvent ) => {
        const target = e.target as HTMLDivElement;
        
        if (target.className.split(' ')[1] !== clickedCountry){
            setClickedCountry((prev) => target.className.split(" ")[1]);
        }
    }

    const onMouseLeaveWorldMap = ( e : React.MouseEvent ) => {
        if (hoveredCountry !== ""){
            setHoveredCountry("");
        }
    }
    
    // useEffect(() =>  {
    //     if (accessToken){
    //         const _getTravelHistory = async () => {
    //             return await getTravelHistory(accessToken);
    //         }
    //         _getTravelHistory().then(res => console.log(res));
    //     }
    // }, [accessToken])

    return worldMap && (
        <div className="map-wrapper">
            <div className="world-map-indicator">
                <span>visited </span> &nbsp; &nbsp; 
                <div className="visited"></div>
                &nbsp; &nbsp; <span>wishlist </span> &nbsp; &nbsp;
                <div className="wishlist"></div>
                &nbsp; &nbsp; <span>selected </span> &nbsp; &nbsp;
                <div className="selected"></div>
            </div>
            <div className="world-map-wrapper" onMouseLeave={onMouseLeaveWorldMap}>
                {worldMap.map((e) => {
                    const country = e.split(' ')[1];
                    return e === "Sea" ? (
                        <div className={e} onMouseOver={onMouseOverSea}></div>
                    ) : <div 
                            className={e} 
                            onMouseOver={onMouseOverCountry} 
                            onClick={onClickCountry} 
                            style={{ backgroundColor : ( usersTravelHistory.visitedCountries.indexOf(country) !== -1  || country === clickedCountry || country === hoveredCountry ) ? "#fcb662" 
                            : country === selectedCountry ? "rgb(136, 150, 166)" 
                            : usersTravelHistory.wishListCountries.indexOf(country) !== -1 ? "#cdabff"
                            : "" }}></div>
                })}
            </div>
            <span className="activated-country">{hoveredCountry ? hoveredCountry : clickedCountry ? clickedCountry : null}</span>
        </div>
    )
}

export default Map; 