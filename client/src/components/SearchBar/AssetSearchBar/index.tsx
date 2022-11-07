import React, {useState, useEffect} from "react";
import "./AssetSearchBar.scss";
import getAssetInfo from "../../../api/getStock";

const AssetSearchBar = () => {
    const [asset, setAsset] = useState<string>("");
    const onChange = ( e : React.ChangeEvent ) => {
        const target = e.target as HTMLInputElement;
        setAsset(target.value);
    }
    const onSubmit = async( e : React.FormEvent ) => {
        e.preventDefault();
        const res = await getAssetInfo(asset);
        console.log(res);
    }
    useEffect(() => {
        console.log(asset);
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