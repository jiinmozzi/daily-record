import {useState, useEffect} from "react";

import "./AssetPortfolioSummarySection.scss";
import { AssetPortfolioType } from "../../../pages/AssetPortfolio";
type AssetPortfolioSummarySectionPropsType = {
    assetPortfolio : AssetPortfolioType[],
}

const AssetPortfolioSummarySection = ({assetPortfolio} : AssetPortfolioSummarySectionPropsType) => {

    return (
        <div className="asset-portfolio-summary-section-wrapper">
            <div className="asset-portfolio-summary-section-inner">
                <div id="asset-portfolio-user-name">Jinho</div>
                <div id="current-total-asset">
                    <span id="total-asset-text">총 자산</span>
                    <span id="total-asset-value">₩23,081,340</span>
                </div>
                <div id="total-investment">
                    <span id="total-investment-text">총 투자금액</span>
                    <span id="total-investment-value">₩20,919,319</span>
                </div>
                <div id="current-index-asset">
                    <div id="evaluated-profit-loss" className="current-indexes">
                    <span className="current-indexes-text">평가 손익</span>
                    <span className="currnet-indexes-value" id="evaluation-value">₩2,113,123(9.7%)</span>
                    </div>
                    <div id="investment-dividend" className="current-indexes">
                        <span className="current-indexes-text">시가 배당률</span>
                        <span className="currnet-indexes-value" id="currnet-dividend-rate-value">2.7%</span>
                    </div>
                    <div id="received-dividend" className="current-indexes">
                        <span className="current-indexes-text">배당 누적액</span>
                        <span className="currnet-indexes-value" id="dividend-accumulation-value">₩31,200</span>
                    </div>
                </div>
            </div>
        </div>        
    )
}

export default AssetPortfolioSummarySection;