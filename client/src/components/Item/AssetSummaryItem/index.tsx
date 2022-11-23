import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AssetSummaryItem.scss";

type AssetSummaryItemPropsType = {
    ticker : string,
    name : string,
    country : string,
}

const AssetSummaryItem = ({ticker, name, country} : AssetSummaryItemPropsType) => {
    const [stockImageUrl, setStockImageUrl] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        if (ticker.length > 0 && country === "US"){
            setStockImageUrl(`https://images.therich.io/images/logo/us/${ticker}.png`)
            return;
        }
        if (ticker.length > 0 && country === "KO"){
            setStockImageUrl(`https://images.therich.io/images/logo/kr/${ticker}.png`)
        }
    }, [ticker, country]);

    const navigateToAssetTicker = (e : React.MouseEvent) => {
        
        // console.log('i clicked')
        navigate(`/asset/${ticker}`);
    }

    const onMouseDownInner = (e : React.MouseEvent) => {
        e.preventDefault();
    }
    return (
        <div className="asset-summary-item-wrapper" onMouseDown={onMouseDownInner} onClick={navigateToAssetTicker}>
            <img className="asset-summary-stock-image" src={stockImageUrl} alt={ticker} />
            <div className="asset-summary-name-info">
                <div className="asset-summary-name">{name.length > 25 ? name.slice(0, 25) + "..." : name}</div>
                <div className="asset-summary-ticker">{ticker}</div>
            </div>
            <div className="asset-summary-country">{country}</div>
        </div>
    )
}

export default AssetSummaryItem;