import {useState, useEffect} from "react";
import Map from "../../components/Map";
import "./Travel.scss";
import CountrySearchBar from "../../components/SearchBar/CountrySearchBar";
import UserTravelHistory from "../../components/UserTravelHistory";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../store/atom";
import getTravelHistory from "../../api/getTravelHistory";
import CreateTravelButton from "../../components/Button/CreateTravelButton";
import CreateTravelWishListButton from "../../components/Button/CreateTravelWishListButton";
import TravelStoryList from "../../components/ItemList/TravelStoryList";
import getTravelStories from "../../api/getTravelStories";
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
    const [usersTravelStories, setUsersTravelStories] = useState<any>([]);
    const [usersWishListStories, setUsersWishListStories] = useState<any>([]);
    useEffect(() => {
        if (accessToken){
            const _getTravelHistory = async() => {
                await getTravelHistory(accessToken).then(res => setUsersTravelHistory(res.data));
            }
            _getTravelHistory();
            const _getTravelStories = async() => {
                await getTravelStories(accessToken).then(res => {
                    setUsersTravelStories(res.data.visitedTravelStories);
                    setUsersWishListStories(res.data.wishListTravelStories);
                });
            }
            _getTravelStories();
        }
    }, [accessToken])
    
    return (
        <div className="travel-wrapper">
            <div className="map-info">
                <Map selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} usersTravelHistory={usersTravelHistory} setUsersTravelHistory={setUsersTravelHistory}/>
                <div id="map-controller">
                    <CountrySearchBar selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} usersTravelHistory={usersTravelHistory} setUsersTravelHistory={setUsersTravelHistory}/>
                    <CreateTravelButton />
                    <CreateTravelWishListButton />
                </div>
            </div>
            <div className="country-search-section-wrapper">
                <UserTravelHistory usersTravelHistory={usersTravelHistory}/>

                <TravelStoryList travelStories={usersTravelStories} visited={true}/>
                <TravelStoryList travelStories={usersWishListStories} visited={false}/>
            </div>
            
        </div>
    )
}

export default Travel;