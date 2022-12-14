import React, {useState, useEffect} from "react";
import "./MapDropDown.scss";

type MapDropDownPropsType = {
    formattedAddress : string,
    location : {
        lat : number,
        lng : number,
    },
    name : string,
    addedLocation : any,
    setAddedLocation : any,
}

const MapDropDown = ({formattedAddress, location, name, addedLocation, setAddedLocation} : MapDropDownPropsType) => {
    useEffect(() => {
        console.log(location.lat);
        console.log(location.lng);
    }, [location])

    const onMouseDown = (e : React.MouseEvent) => {
        e.preventDefault();
    }

    const addLocation = (e : React.MouseEvent) => {
        setAddedLocation((addedLocation : any) => [...addedLocation, {formattedAddress, location, name}]);
    }
    return (
        <div className="map-dropdown-wrapper" onMouseDown={onMouseDown} onClick={addLocation}>
            <div className="map-dropdown-name">🚀&nbsp;&nbsp;{name}</div>
            <div className="map-dropdown-address">{formattedAddress}</div>
        </div>
    )
}

export default MapDropDown;