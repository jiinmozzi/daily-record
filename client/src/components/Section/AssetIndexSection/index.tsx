import React, {useState, useEffect} from "react";
import "./AssetIndexSection.scss";

const AssetIndexSection = () => {
    const [isPlaying, setIsPlaying] = useState<boolean>(true);
    const onMouseEnter = (e : React.MouseEvent) => {
        setIsPlaying((prev) => false);
    }
    const onMouseLeave = (e : React.MouseEvent) => {
        setIsPlaying((prev) => true);
    }
    return (
        <div className="asset-index-section-wrapper" style={{animationPlayState : isPlaying ? "running" : "paused"}}>
            <div className="asset-index-box">
                <span className="index-text">NASDAQ</span>
                <div className="index-box" id="nasdaq-box" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}></div>
            </div>
            <div className="asset-index-box">
                <span className="index-text">S&P100</span>
                <div className="index-box" id="snp-box" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}></div>
            </div>
            <div className="asset-index-box">
                <span className="index-text">KOSPI</span>
                <div className="index-box" id="kospi-box" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}></div>
            </div>
            <div className="asset-index-box">
                <span className="index-text">SHA</span>
                <div className="index-box" id="sha-box" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}></div>
            </div>
            <div className="asset-index-box">
                <span className="index-text">BSE</span>
                <div className="index-box" id="bse-box" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}></div>
            </div>
        </div>
    )
}

export default AssetIndexSection;