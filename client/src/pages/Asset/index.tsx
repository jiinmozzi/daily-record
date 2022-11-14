import axios from "axios";
import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import AssetSearchBar from "../../components/SearchBar/AssetSearchBar";
import AssetSearchSection from "../../components/Section/AssetSearchSection";
import AssetMbtiSection from "../../components/Section/AssetMbtiSection";
import AssetIndexSection from "../../components/Section/AssetIndexSection";
import AssetMarketCapSection from "../../components/Section/AssetMarketCapSection";
import AssetDividendSection from "../../components/Section/AssetDividendSection";
import "./Asset.scss";

const portfolios = ['AAPL', 'TSLA', 'NKE', 'IONQ'];

const Asset = () => {
    const navigate = useNavigate();
    const [assets, setAssets] = useState<any[]>([]);
    // useEffect(() => {
    //     const fetch = async(ticker : string) => {
    //         const data = await axios.get(`http://localhost:3002/asset/${ticker}`);
    //         console.log(data);
            
    //     }
        
    //     (async() => {
    //         try{
    //             for await (const asset of portfolios){
    //                 fetch(asset);
    //             }
    //         }   catch (err){
    //             console.log(err);
    //         }
    //     })();
    // }, [])
    return (
        <div className="asset-wrapper">
            {/* <div className="asset-proverb" style={{position : "relative"}}>
                <div id="my-portfolio-nav" onClick={() => navigate('/asset/portfolio')}>내 자산 보러가기</div>
                <div className="proverb-container">
                    <span className="proverb-text">"&nbsp;두툼한 지갑이 무조건 좋다고 말할 수 없다.</span><br></br>
                    <span className="proverb-text">그러나 텅빈 지갑은 확실히 나쁘다." &nbsp;</span>
                </div>
                <AssetSearchBar />
            </div> */}
            <AssetSearchSection />
            <AssetMbtiSection />
            <AssetIndexSection />
            <AssetMarketCapSection />
            <AssetDividendSection />
        </div>
    )
}

export default Asset;