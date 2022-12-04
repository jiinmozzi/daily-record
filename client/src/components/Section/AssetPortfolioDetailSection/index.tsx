import {useState, useEffect} from "react";

import './AssetPortfolioDetailSection.scss';

type AssetPortfolioDetailSectionPropsType = {
    assetPortfolio : any[],
}

const AssetPortfolioDetailSection = ({assetPortfolio} : AssetPortfolioDetailSectionPropsType) => {
    return (
        <div className="asset-portfolio-detail-section-wrapper">
            종목별 수익률 및 tradingview에서 따온 view; 
        </div>
    )
}
export default AssetPortfolioDetailSection;