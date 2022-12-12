import React, {useState, useEffect} from "react";
import countries from "../../../assets/country.json";
import { Autocomplete, TextField } from "@mui/material";
import TourRoundedIcon from '@mui/icons-material/TourRounded';
import SynagogueRoundedIcon from '@mui/icons-material/SynagogueRounded';
import toggleTravelHistory from "../../../api/toggleTravelHistory";
import "./CountrySearchBar.scss";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../store/atom";

type UsersTravelHistoryType = {
    visitedCountries : string[]
    wishListCountries : string[]
}

type SelectedCountryType = {
    selectedCountry : string,
    setSelectedCountry : any, 
    usersTravelHistory : UsersTravelHistoryType,
    setUsersTravelHistory : any,
}
const CountrySearchBar = ({selectedCountry, setSelectedCountry, usersTravelHistory, setUsersTravelHistory} : SelectedCountryType) => {
    const [accessToken, setAccessToken] = useRecoilState<string>(accessTokenState);
    const [countryList, setCountryList] = useState<object[]>([]);
    
    useEffect(() => {
        const _countryList = [];
        for (let i=0; i<countries.length; i++){
            _countryList.push({label : countries[i], id : countries[i]});
        }
        setCountryList(_countryList);
    }, [countries]);
    
    const onChange = (e : React.SyntheticEvent) => {
        const target = e.target as HTMLElement;
        // setSelectedCountry(target.innerHTML);
        setSelectedCountry(target.innerText);
    } 
    
    const toggleVisited = async(e : React.MouseEvent) => {
        const _toggleTravelHistory = async() => {
            return await toggleTravelHistory(accessToken, selectedCountry, "VISITED");
        }
        if ( usersTravelHistory.visitedCountries.indexOf(selectedCountry) !== -1 ){
            const newVisitedCountries = usersTravelHistory.visitedCountries.filter(e => e !== selectedCountry);
            const newUsersTravelHistory : UsersTravelHistoryType = {wishListCountries : usersTravelHistory.wishListCountries, visitedCountries : newVisitedCountries};
            setUsersTravelHistory(newUsersTravelHistory);
        }   else {
            usersTravelHistory.visitedCountries.push(selectedCountry);
            const newUsersTravelHistory : UsersTravelHistoryType = {wishListCountries : usersTravelHistory.wishListCountries, visitedCountries : usersTravelHistory.visitedCountries};
            setUsersTravelHistory(newUsersTravelHistory);
        }
        _toggleTravelHistory().then(res => console.log(res));
        
    }

    const toggleWishList = (e : React.MouseEvent) => {
        const _toggleTravelHistory = async() => {
            return await toggleTravelHistory(accessToken, selectedCountry, "WISHLIST");
        }
        if ( usersTravelHistory.wishListCountries.indexOf(selectedCountry) !== -1 ){
            const newWishListCountries = usersTravelHistory.wishListCountries.filter(e => e!== selectedCountry);
            const newUsersTravelHistory = {wishListCountries : newWishListCountries, visitedCountries : usersTravelHistory.visitedCountries};
            setUsersTravelHistory(newUsersTravelHistory);
        }   else {
            usersTravelHistory.wishListCountries.push(selectedCountry);
            const newUsersTravelHistory = {wishListCountries : usersTravelHistory.wishListCountries, visitedCountries : usersTravelHistory.visitedCountries};
            setUsersTravelHistory(newUsersTravelHistory);
        }
        _toggleTravelHistory().then(res => console.log(res));
    }
    
    const onAutoComplete = (e : React.KeyboardEvent) => {
        console.log(e);
        const target = e.target as HTMLInputElement;
        if (e.key === "Enter"){
            setSelectedCountry((prev : any) => target?.value);
        }
    }

    return countryList && usersTravelHistory && (
        <div className="country-search-bar-wrapper">
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={countryList}
                sx={{ width: 300}}
                renderInput={(params) => <TextField {...params} label="Search Country..." onKeyDown={onAutoComplete}/>}
                onChange={onChange}
                
            />
            {
                selectedCountry &&
                <div className="country-add-nav">
                    <div className="country-visit-boolean">
                        <span>Visited : {usersTravelHistory.visitedCountries.indexOf(selectedCountry) !== -1 ? "YES!" : "NO"}</span>
                        <span>WishList : {usersTravelHistory.wishListCountries.indexOf(selectedCountry) !== -1 ? "YES!" : "NO"}</span>
                    </div>
                    <div>
                        <TourRoundedIcon className="tour-icon" onClick={toggleVisited}/>
                        {usersTravelHistory.visitedCountries.indexOf(selectedCountry) !== -1 ? 
                        <span className="add-nav-span"> &lt;&lt; Click to remove {selectedCountry} in visited. </span>
                        : <span className="add-nav-span"> &lt;&lt; Click to add {selectedCountry} as visited. </span>}
                        
                    </div>
                    <div>
                        <SynagogueRoundedIcon className="wish-icon" onClick={toggleWishList}/> 
                        {usersTravelHistory.wishListCountries.indexOf(selectedCountry) !== -1 ? 
                        <span className="add-nav-span"> &lt;&lt; Click to remove {selectedCountry} in wishlist. </span>
                        : <span className="add-nav-span"> &lt;&lt; Click to add {selectedCountry} as wishlist. </span>}
                        
                    </div>
                </div>
            }
            
            
        </div>
        
    )
}
export default CountrySearchBar;