import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AssetMarketCapSection.scss";
import getMarketCapRank from "../../../api/getMarketCapRank";

const AssetMarketCapSection = () => {
    const navigate = useNavigate();
    const [rankings, setRankings] = useState<any[]>([])
    const [isPlaying, setIsplaying] = useState<boolean>(true);
    useEffect(() => {
        const fetch = async() => {
            return await getMarketCapRank(); 
        }
        fetch().then(res => setRankings(res.data));
    }, [])

    useEffect(() => {
        console.log(rankings);
    }, [rankings]) 
    return (
        <div className="asset-market-cap-section-wrapper">
            <span id="market-cap-main-text">시가 총액 순위</span>
            <div id="market-cap-rankings-container">
                <div className="ranks-info-text">
                    <div id="market-cap-rank-text" className="market-cap-info-text">Rank</div>
                    <div id="market-cap-name-text" className="market-cap-info-text">Name</div>
                    <div id="market-cap-sum-text" className="market-cap-info-text">Sum</div>
                    <div id="market-cap-price-text" className="market-cap-info-text">Price</div>
                    <div id="market-cap-country-text" className="market-cap-info-text">Country</div>
                </div>
                <div id="ranks-info-outer-wrapper">
                    <div id="ranks-info-wrapper" style={{animationPlayState : isPlaying ? "running" : "paused"}}>
                        
                        {rankings.map(rankInfo => {
                            return (
                                <div id="ranks-info">
                                    <div className="ranks-info">
                                        <div id="market-cap-rank" className="market-cap-info">{rankInfo[0].replaceAll('"', '')}</div>
                                        <div id="market-cap-name-info" onMouseEnter={() => setIsplaying(false)} onMouseLeave={() => setIsplaying(true)} onClick={() => navigate(`/asset/${rankInfo[2].replaceAll('"', '')}`)}>
                                            <img className="market-cap-image" src={`https://companiesmarketcap.com/img/company-logos/64/${rankInfo[2].replaceAll('"', '')}.webp`} alt={rankInfo[2].replaceAll('"', '')} /> 
                                            <div>
                                                <div id="market-cap-name" className="market-cap-info">{rankInfo[1].replaceAll('"', '')}</div>
                                                <div id="market-cap-ticker" className="market-cap-info">{rankInfo[2].replaceAll('"', '')}</div>
                                            </div>
                                        </div>
                                        <div id="market-cap-sum" className="market-cap-info">
                                            {/* {Number(rankInfo[3].replaceAll('"', ''))} */}
                                            ${Number(rankInfo[3].replaceAll('"','')) > Math.pow(10, 12) ? (Number(rankInfo[3].replaceAll('"', '') / Math.pow(10,12))).toFixed(3) + ' T': 
                                            Number(rankInfo[3].replaceAll('"', '')) > Math.pow(10, 9) ? (Number(rankInfo[3].replaceAll('"', '') / Math.pow(10,9))).toFixed(2) + ' B' : null}
                                        </div>
                                        <div id="market-cap-price" className="market-cap-info">$&nbsp;{rankInfo[4].replaceAll('"', '')}</div>
                                        <div id="market-cap-country" className="market-cap-info">{rankInfo[5].replaceAll('"', '')}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default AssetMarketCapSection;