import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import AssetSummaryItem from "../../Item/AssetSummaryItem";

import "./AssetDropDown.scss";

const AssetDropDown = ({assetSuggestions} : any) => {
    const [assetCount, setAssetCount] = useState<number>(0);
    

    useEffect(() => {
        console.log(assetSuggestions);
        if (Object.values(assetSuggestions).length > 0){
            setAssetCount( assetSuggestions.NASDAQ.length + assetSuggestions.NYSE.length + assetSuggestions.KOSDAQ.length + assetSuggestions.KOSPI.length + assetSuggestions.AMEX.length);
        }
        
    }, [assetSuggestions]
    )


    return (
        <div className="asset-dropdown-wrapper" style={{ height : assetCount > 0 ? "280px" : "80px"}}>
        {assetSuggestions && 
            <>
                {assetSuggestions.NASDAQ && assetSuggestions.NASDAQ.slice(0, 10).map((e : string[]) => <AssetSummaryItem ticker={e[0]} name={e[1]} country={'US'}/>)}            
                {assetSuggestions.NYSE && assetSuggestions.NYSE.slice(0, 10).map((e : string[]) => <AssetSummaryItem ticker={e[0]} name={e[1]} country={'US'}/>)}
                {assetSuggestions.KOSDAQ && assetSuggestions.KOSDAQ.slice(0, 10).map((e : string[]) => <AssetSummaryItem ticker={e[0]} name={e[1]} country={'KO'}/>)}
                {assetSuggestions.KOSPI && assetSuggestions.KOSPI.slice(0, 10).map((e : string[]) => <AssetSummaryItem ticker={e[0]} name={e[1]} country={'KO'}/>)}
                {assetSuggestions.AMEX && assetSuggestions.AMEX.slice(0, 10).map((e : string[]) => <AssetSummaryItem ticker={e[0]} name={e[1]} country={'US'}/>)}
            </>
        }
        {   
            assetCount === 0 && <div className="asset-dropdown-empty-msg">검색 결과가 없습니다.</div>
        }
        </div>
    )
}

export default AssetDropDown;
