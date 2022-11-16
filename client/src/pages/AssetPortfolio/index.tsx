import {useState, useEffect} from "react";
import AssetSearchSection from "../../components/Section/AssetSearchSection";
import AssetPortfolioSummarySection from "../../components/Section/AssetPortfolioSummarySection";
import AssetPortfolioGraphSection from "../../components/Section/AssetPortfolioGraphSection";
import AssetPortfolioDetailSection from "../../components/Section/AssetPortfolioDetailSection";
import "./AssetPortfolio.scss";
const AssetPortfolio = () => {
    return (
        <div className="asset-portfolio-wrapper">
            <AssetSearchSection />
            <AssetPortfolioSummarySection/>
            <AssetPortfolioGraphSection/>
            <AssetPortfolioDetailSection/>
        </div>
    )
}

export default AssetPortfolio;