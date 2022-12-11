import AssetDropDown from "../../DropDown/AssetDropDown";
import React, {useState, useEffect, useCallback} from "react";
import { useNavigate } from "react-router-dom";
import "./AssetSearchBar.scss";
import getAssetInfo from "../../../api/getStock";
import { debounce } from "lodash";


const AssetSearchBar = () => {
    const navigate = useNavigate();
    const [asset, setAsset] = useState<string>("");
    const [focused, setFocused] = useState<boolean>(false);
    const [assetSuggestions, setAssetSuggestions] = useState<any>({});
    const [currentAsset, setCurrentAsset] = useState<string>("");


    const fetchAssets = (e : React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        if (target.value.length > 0){
            getAssetInfo(target.value).then(res => {
                setAssetSuggestions(res.data);
            });
        }
    }
    const debounceChangeHandler = useCallback(
        debounce(fetchAssets, 400), []
    )

    const onKeyDown = (e : React.KeyboardEvent) => {
        const target = e.target as HTMLInputElement;
        setAsset((prev) => target.value);
    }

    const onSubmit = async( e : React.FormEvent ) => {
        e.preventDefault();
        // navigate(`/asset/${asset}`)
        // const res = await getAssetInfo(asset);
        // console.log(res);
    }
    
    // useEffect(() => {
    //     if (asset.length === 4){
    //         const fetch = async() => {
    //             const res = await getAssetInfo(asset);
    //             return res;
    //         }
    //         fetch().then(res => console.log(res));
    //     }
        
    // }, [asset])
    return (
        <div className="asset-search-bar-wrapper">
            <form onSubmit={onSubmit}>
                <input type="text" onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} className="input-container" placeholder="주식, 가상자산 티커 검색" onChange={debounceChangeHandler} onKeyDown={onKeyDown}/>
            </form>
            {focused && <AssetDropDown assetSuggestions={assetSuggestions} focused={focused} setFocused={setFocused}/>}
        </div>
    )
}

export default AssetSearchBar;