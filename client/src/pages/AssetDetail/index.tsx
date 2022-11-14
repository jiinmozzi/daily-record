import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import AssetSearchBar from "../../components/SearchBar/AssetSearchBar";
import AssetSearchSection from "../../components/Section/AssetSearchSection";
import Loading from "../../components/Loading";

import "./AssetDetail.scss";

const AssetDetail = () => {
    const [assetData, setAssetData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const {ticker} = useParams();
    
    useEffect(() => {
        setIsLoading((prev) => true);
        const fetch = async() => {
        const res = await axios.get(`http://localhost:3002/asset/${ticker}`);
        setAssetData(res.data.data);
        }
        fetch();
        
    }, [ticker])
    useEffect(() => {
        if (assetData.length > 0){
            setIsLoading((prev) => false);
        }
    }, [assetData])
    return (
        <div className="asset-detail-wrapper">
            <AssetSearchSection />
            {isLoading ? <Loading /> : (
                assetData.map((e: any) => {
                return (
                    <div>date : {e.date} , open : {e.open}, close : {e.close}</div>
                )
            }))
            }
            
            
        </div>
    )
}

export default AssetDetail;