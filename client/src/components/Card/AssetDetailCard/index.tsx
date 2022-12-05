import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

import "./AssetDetailCard.scss";

const AssetDetailCard = () => {
    return (
        <div className="asset-detail-card-wrapper">
            <div id="asset-detail-card-upper">
                <img className="asset-detail-card-image" src={`https://images.therich.io/images/logo/us/AAPL.png`} alt="" />
                <div className="asset-detail-ticker-info">
                    <div className="asset-detail-card-ticker asset-detail-card-ticker-text">AAPL</div>
                    <div className="asset-detail-card-name">apple</div>                    
                </div>
                <div className="asset-detail-quantity">
                    <span className="asset-detail-quantity-text">수량</span>
                    <span className="asset-detail-quantity-count">10</span>
                </div>
            </div>
            <div id="asset-detail-card-financial">
                <div className="asset-detail-card-financial-upper">
                    <div className="asset-detail-sum asset-detail-card-text">자산가치</div>
                    <div className="asset-detail-return asset-detail-card-text">수익</div>
                    <div className="asset-detail-dividend asset-detail-card-text">배당월</div>
                </div>
                <div className="asset-detail-card-financial-bottom">
                    <div className="asset-detail-buy-price asset-detail-card-text">구매가</div>
                    <div className="asset-detail-current-price asset-detail-card-text">현재가</div>
                    <div className="asset-dividend-rate asset-detail-card-text">투자배당률</div>
                </div>
            </div>
        </div>
    )
}

export default AssetDetailCard;