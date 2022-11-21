import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./AssetSearchBar.scss";
import getAssetInfo from "../../../api/getStock";

const AssetSearchBar = () => {
    const navigate = useNavigate();
    const [asset, setAsset] = useState<string>("");
    const onChange = ( e : React.ChangeEvent ) => {
        const target = e.target as HTMLInputElement;
        setAsset(target.value);
    }
    const onSubmit = async( e : React.FormEvent ) => {
        e.preventDefault();
        navigate(`/asset/${asset}`)
        const res = await getAssetInfo(asset);
        console.log(res);
    }
    useEffect(() => {
        if (asset.length === 4){
            const fetch = async() => {
                const res = await getAssetInfo(asset);
                return res;
            }
            fetch().then(res => console.log(res));
        }
        
    }, [asset])
    return (
        <div className="asset-search-bar-wrapper">
            <form onSubmit={onSubmit}>
                <input type="text" className="input-container" placeholder="주식, 가상자산 티커 검색" onChange={onChange}/>
            </form>
        </div>
    )
}

export default AssetSearchBar;