import React, {useState, useEffect} from "react";
import worldMap from "../../assets/map.json";
import "./Map.scss";
const Map = () => {
    const [country, setCountry]= useState<string>("");
    const onMouseOver = (e : React.MouseEvent) => {
        console.log(e.target);
    }
    return worldMap && (
        <div className="map-wrapper">
            {worldMap.map((e) => {
                return e === "Sea" ? (
                    <div className={e}></div>
                ) : <div className={e} onMouseOver={onMouseOver}></div>
            })}
        </div>
    )
}

export default Map;