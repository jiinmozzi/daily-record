import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import AssetSearchBar from "../../components/SearchBar/AssetSearchBar";
import "./AssetDetail.scss";

const AssetDetail = () => {
    const navigate = useNavigate();
    const {ticker} = useParams();
    useEffect(() => {
        console.log(ticker);
    }, []);
    useEffect(() => {
        const fetch = async() => {
        const data = await axios.get(`http://localhost:3002/asset/${ticker}`);
        console.log(data);
        }
        fetch();
    }, [ticker])
    return (
        <div className="asset-detail-wrapper">
        
        </div>
    )
}

export default AssetDetail;