import React, { useCallback, useEffect, useRef, useState } from "react";
import getGoogleMapPlaces from "../../../api/getGoogleMapPlaces";

import { debounce } from "lodash";

import SearchIcon from '@mui/icons-material/Search';

import "./MapSearchBar.scss";
import MapDropDown from "../../DropDown/MapDropDown";

const MapSearchBar = ({map, mapApi} : any) => {
    const [focused, setFocused] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchedResult, setSearchedResult] = useState<any[]>([]);
    const [input, setInput] = useState<any>();
    const [scrolled, setScrolled] = useState<boolean>(false);
    const [addedLocation, setAddedLocation] = useState<any[]>([]);
    useEffect(() => {
        console.log("map: ", map);   
        console.log("googleMaps: ", mapApi);
    }, [map, mapApi])

    useEffect(() => {
        console.log(searchedResult);
        if (searchedResult.length > 7){
            setScrolled(true);
        }   else {
            setScrolled(false);
        }
    }, [searchedResult])

    const fetchPlaces = (e : React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        if (target.value.length > 0){
            getGoogleMapPlaces(target.value).then(res => {
                setSearchedResult(res.data.results);
            });
        }
    }
    const debounceHandler = useCallback(
        debounce(fetchPlaces, 400), []
    )

    const onKeyDown = (e : React.KeyboardEvent) => {
        const target = e.target as HTMLInputElement;
        setSearchQuery(target.value);
    }
    return (
        <div className="map-search-bar-wrapper" style={{ width : scrolled ? "320px" : "300px", minWidth : scrolled ? "320px" : "300px"}}>
            <input
                ref={(ref) => setInput(ref)}
                className="map-search-bar-input"
                type="text" 
                placeholder="Search places.."
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onChange={debounceHandler}
                onKeyDown={onKeyDown}
            />
            <SearchIcon id="map-search-icon"/>
            { searchedResult.length > 0 && searchQuery.length > 0 && focused && searchedResult.map((e: any) => <MapDropDown formattedAddress={e.formatted_address} location={e.geometry.location} name={e.name} addedLocation={addedLocation} setAddedLocation={setAddedLocation} />)}
            { (searchQuery.length === 0 || !focused) && <div id="added-introducing-text">현재 추가된 플레이스입니다.</div> }
            { (searchQuery.length === 0 || !focused) && addedLocation.map((e : any) => <MapDropDown formattedAddress={e.formattedAddress} location={e.location} name={e.name} addedLocation={addedLocation} setAddedLocation={setAddedLocation} />)}
        </div>
    )
}

export default MapSearchBar;