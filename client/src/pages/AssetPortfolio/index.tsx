import axios from "axios";

import {useState, useEffect, useCallback} from "react";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../store/atom";
import AssetSearchSection from "../../components/Section/AssetSearchSection";
import AssetPortfolioSummarySection from "../../components/Section/AssetPortfolioSummarySection";
import AssetPortfolioGraphSection from "../../components/Section/AssetPortfolioGraphSection";
import AssetPortfolioDetailSection from "../../components/Section/AssetPortfolioDetailSection";
import "./AssetPortfolio.scss";
import getUserAssetPortfolio from "../../api/getUserAssetPortfolio";

export type AssetPortfolioType = {
    name : string,
    ticker : string,
    sector? : string,
    balance : number,
}

const AssetPortfolio = () => {
    const [accessToken, setAccessToken] = useRecoilState<string>(accessTokenState);
    const [assetPortfolio, setAssetPortfolio] = useState<AssetPortfolioType[]>([]);
    const [ticker, setTicker] = useState<string>("MSFT"); // needs to be deleted;
    useEffect(() => {
        if ( ticker && ticker.length > 0 ){
            const fetch = async() => {
                const res = await axios.get(`http://localhost:3002/asset/${ticker}`);
                // setAssetData(res.data.data);
                console.log(res);
            }
            fetch();
        }
    }, [ticker])
    
    // useEffect(() => {
    //     if (!accessToken) return;
    //     const fetch = async() => {
    //         return await getUserAssetPortfolio(accessToken);
    //     }
    //     fetch().then(res => {
    //         if (res.message === "OK") setAssetPortfolio(res.data);
    //     })
    // }, [accessToken]);

    return (
        <div className="asset-portfolio-wrapper">
            <AssetSearchSection />
            <div id="asset-portfolio-bottom-wrapper">
                <div id="asset-portfolio-bottom-left-wrapper">
                    <AssetPortfolioSummarySection assetPortfolio={assetPortfolio}/>
                    <AssetPortfolioGraphSection assetPortfolio={assetPortfolio}/>
                </div>
                <div id="asset-portfolio-bottom-right-wrapper">
                    <AssetPortfolioDetailSection assetPortfolio={assetPortfolio}/>
                </div>
            </div>
        </div>
    )
}

export default AssetPortfolio;