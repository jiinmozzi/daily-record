import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

import "./AssetDetailCard.scss";

const AssetDetailCard = () => {
    return (
        <div className="asset-detail-card-wrapper">
            <div id="asset-detail-card-upper">
                <img className="asset-detail-card-image" src="" alt="" />
                <div className="asset-detail-ticker-info">
                    <div className="asset-detail-card-ticker">AAPL</div>
                    <div className="asset-detail-card-name">apple</div>                    
                </div>
                <div className="asset-detail-quantity">10개</div>
            </div>
            <div id="asset-detail-card-financial">
                <div className="asset-detail-card-financial-upper">
                    <div className="asset-detail-sum"></div>
                    <div className="asset-detail-return"></div>
                    <div className="asset-detail-dividend"></div>
                </div>
                <div className="asset-detail-card-financial-bottom">
                    <div className="asset-detail-buy-price"></div>
                    <div className="asset-detail-current-price"></div>
                    <div className="asset-dividend-rate"></div>
                </div>
            </div>
        </div>
    )
}

export default AssetDetailCard;