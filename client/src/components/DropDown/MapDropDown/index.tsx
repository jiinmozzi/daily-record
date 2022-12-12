import {useState, useEffect} from "react";
import "./MapDropDown.scss";

type MapDropDownPropsType = {
    formattedAddress : string,
    location : {
        lat : number,
        lng : number,
    },
    name : string,
}

const MapDropDown = ({formattedAddress, location, name} : MapDropDownPropsType) => {
    useEffect(() => {
        console.log(location.lat);
        console.log(location.lng);
    }, [location])
    return (
        <div className="map-dropdown-wrapper">
            <div className="map-dropdown-name">🚀&nbsp;&nbsp;{name}</div>
            <div className="map-dropdown-address">{formattedAddress}</div>
        </div>
    )
}

export default MapDropDown;