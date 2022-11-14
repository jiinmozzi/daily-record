import {useState, useEffect} from "react";
import AssetSearchSection from "../../components/Section/AssetSearchSection";
import "./AssetPortfolio.scss";
const AssetPortfolio = () => {
    return (
        <div className="asset-portfolio-wrapper">
            <AssetSearchSection />
        </div>
    )
}

export default AssetPortfolio;