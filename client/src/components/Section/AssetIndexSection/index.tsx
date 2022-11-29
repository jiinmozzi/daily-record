import React, {useState, useEffect} from "react";
import { MiniChart } from "react-ts-tradingview-widgets";


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
                <MiniChart dateRange="60M" symbol="NDX" trendLineColor="#9FC5E8" underLineColor="#DCE9F7" colorTheme="light" width={270} height={200}></MiniChart>
                {/* <div className="index-box" id="nasdaq-box" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}></div> */}
                
            </div>
            <div className="asset-index-box">
                <span className="index-text">S&P100</span>
                <MiniChart dateRange="60M" symbol="SPY" trendLineColor="#9FC5E8" underLineColor="#DCE9F7" colorTheme="light" width={270} height={200}></MiniChart>
            </div>
            <div className="asset-index-box">
                <span className="index-text">KOSPI</span>
                <MiniChart dateRange="60M" symbol="KOSPI" trendLineColor="#9FC5E8" underLineColor="#DCE9F7" colorTheme="light" width={270} height={200}></MiniChart>
            </div>
            <div className="asset-index-box">
                <span className="index-text">SHA</span>
                <MiniChart dateRange="60M" symbol="000001" trendLineColor="#9FC5E8" underLineColor="#DCE9F7" colorTheme="light" width={270} height={200}></MiniChart>
            </div>
            <div className="asset-index-box">
                <span className="index-text">SENSEX</span>
                <MiniChart dateRange="60M" symbol="SENSEX" trendLineColor="#9FC5E8" underLineColor="#DCE9F7" colorTheme="light" width={270} height={200}></MiniChart>
            </div>
        </div>
    )
}

export default AssetIndexSection;