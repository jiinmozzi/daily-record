import axios from "axios";
import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import AssetSearchBar from "../../components/SearchBar/AssetSearchBar";
import AssetSearchSection from "../../components/Section/AssetSearchSection";
import AssetMbtiSection from "../../components/Section/AssetMbtiSection";
import AssetIndexSection from "../../components/Section/AssetIndexSection";
import AssetMarketCapSection from "../../components/Section/AssetMarketCapSection";
import AssetNewsSection from "../../components/Section/AssetNewsSection";

import "./Asset.scss";

const portfolios = ['AAPL', 'TSLA', 'NKE', 'IONQ'];

const Asset = () => {
    const navigate = useNavigate();
    const [assets, setAssets] = useState<any[]>([]);
    
    return (
        <div className="asset-wrapper">
            <AssetSearchSection />
            <AssetMbtiSection />
            <AssetIndexSection />
            <AssetMarketCapSection />
            <AssetNewsSection />
        </div>
    )
}


export default Asset;