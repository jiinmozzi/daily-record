import {useState, useEffect} from "react";
import Map from "../../components/Map";
import "./Travel.scss";
import CountrySearchBar from "../../components/SearchBar/CountrySearchBar";
import UserTravelHistory from "../../components/UserTravelHistory";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../store/atom";
import getTravelHistory from "../../api/getTravelHistory";

type UsersTravelHistoryType = {
    visitedCountries : string[]
    wishListCountries : string[]
}
const InitialTravelHistory : UsersTravelHistoryType = {
    visitedCountries : [],
    wishListCountries : []
}

const Travel = () => {
    const [selectedCountry, setSelectedCountry] = useState<string>("");
    const [accessToken, setAccessToken] = useRecoilState<string>(accessTokenState);
    const [usersTravelHistory, setUsersTravelHistory] = useState<UsersTravelHistoryType>(InitialTravelHistory);
    useEffect(() => {
        if (accessToken){
            const _getTravelHistory = async() => {
                await getTravelHistory(accessToken).then(res => setUsersTravelHistory(res.data));
            }
            _getTravelHistory();
        }
    }, [accessToken])
    
    return (
        <div className="travel-wrapper">
            <div className="map-info">
                <Map selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} usersTravelHistory={usersTravelHistory} setUsersTravelHistory={setUsersTravelHistory}/>
                <CountrySearchBar selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} usersTravelHistory={usersTravelHistory} setUsersTravelHistory={setUsersTravelHistory}/>
                
            </div>
            <div className="country-search-section-wrapper">
                <UserTravelHistory usersTravelHistory={usersTravelHistory}/>
            </div>
            
        </div>
    )
}

export default Travel;