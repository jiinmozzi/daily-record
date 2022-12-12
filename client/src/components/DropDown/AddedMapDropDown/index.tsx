import React, {useState, useEffect} from "react";
import "./AddedMapDropDown.scss";

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

const AddedMapDropDown = ({formattedAddress, location, name, addedLocation, setAddedLocation} : MapDropDownPropsType) => {
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
        <div className="added-map-dropdown-wrapper" onMouseDown={onMouseDown} onClick={addLocation}>
            <div className="added-map-dropdown-name">🚀&nbsp;&nbsp;{name}</div>
            <div className="added-map-dropdown-address">{formattedAddress}</div>
        </div>
    )
}

export default AddedMapDropDown;