import {useState, useEffect} from "react";

import "./AssetPortfolioSummarySection.scss";

type AssetPortfolioSummarySectionPropsType = {
    assetPortfolio : any[],
    currentEvaluatedAmount : number,
    totalInvestmentAmount : number,
}

const AssetPortfolioSummarySection = ({assetPortfolio, currentEvaluatedAmount, totalInvestmentAmount} : AssetPortfolioSummarySectionPropsType) => {

    return (
        <div className="asset-portfolio-summary-section-wrapper">
            <div className="asset-portfolio-summary-section-inner">
                <div id="asset-portfolio-user-name">Jinho</div>
                <div id="current-total-asset">
                    <span id="total-asset-text">총 자산</span>
                    <span id="total-asset-value">
                        ₩{Math.floor(currentEvaluatedAmount).toLocaleString()}
                    </span>
                </div>
                <div id="total-investment">
                    <span id="total-investment-text">총 투자금액</span>
                    <span id="total-investment-value">₩{Math.floor(totalInvestmentAmount).toLocaleString()}</span>
                </div>
                <div id="current-index-asset">
                    <div id="evaluated-profit-loss" className="current-indexes">
                    <span className="current-indexes-text">평가 손익</span>
                    <span className="currnet-indexes-value" id="evaluation-value">
                        ₩{Math.floor(currentEvaluatedAmount - totalInvestmentAmount).toLocaleString()}
                        &nbsp;({((currentEvaluatedAmount - totalInvestmentAmount) * 100/totalInvestmentAmount).toFixed(1)}%)
                    </span>
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