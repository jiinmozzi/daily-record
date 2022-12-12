import { useEffect, useRef, useState } from "react";
import GoogleMap from "google-map-react";

import "./CreateTravelStory.scss";
import MapSearchBar from "../../components/SearchBar/MapSearchBar";
type Coordinate = {
    lat : number,
    lng : number
}
const CreateTravelStory = () => {
    const [apiReady, setApiReady] = useState<boolean>(false);
    const [map, setMap] = useState<any>(null);
    const [googleMaps, setGoogleMaps] = useState<any>(null);
    const [center, setCenter] = useState<Coordinate>({lat : 37.5, lng : 127});
    const handleApiLoaded = (map : any, maps : any) => {
        if (map && maps){
            setApiReady(true);
            setMap(map);
            setGoogleMaps(maps);
        }
    }
    
    useEffect(() => {
        
    }, [])
    return (
        <div className="create-travel-story-wrapper">
            <h5 id="add-location-text">플레이스 추가하기</h5>
            <div className="map">
                <GoogleMap
                    bootstrapURLKeys={{
                        key : process.env.REACT_APP_GOOGLE_MAP_API_KEY ? process.env.REACT_APP_GOOGLE_MAP_API_KEY : "",
                        libraries : "places"
                    }}
                    defaultZoom={2}
                    defaultCenter={center}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({map, maps} : any) => handleApiLoaded(map, maps)}
                ></GoogleMap>
                {map && googleMaps && <MapSearchBar map={map} mapApi={googleMaps}/>}
            </div>
            
        </div>
    )
}

export default CreateTravelStory;