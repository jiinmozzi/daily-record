import axios from "axios";
import {useState, useEffect} from "react";
import AssetSearchBar from "../../components/SearchBar/AssetSearchBar";
import AssetMbtiSection from "../../components/Section/AssetMbtiSection";
import "./Asset.scss";

const portfolios = ['AAPL', 'TSLA', 'NKE', 'IONQ'];

const Asset = () => {
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
            <div className="asset-proverb">
                <div className="proverb-container">
                    <span className="proverb-text">"&nbsp;두툼한 지갑이 무조건 좋다고 말할 수 없다.</span><br></br>
                    <span className="proverb-text">그러나 텅빈 지갑은 확실히 나쁘다." &nbsp;</span>
                </div>
                <AssetSearchBar />
            </div>
            <AssetMbtiSection/>
        </div>
    )
}

export default Asset;