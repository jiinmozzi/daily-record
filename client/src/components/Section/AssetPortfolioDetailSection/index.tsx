import {useEffect} from "react";
// import { SymbolInfo } from "react-ts-tradingview-widgets";

import './AssetPortfolioDetailSection.scss';
import AssetDetailCard from "../../../components/Card/AssetDetailCard";
type AssetPortfolioDetailSectionPropsType = {
    assetPortfolio : any[],
    kosdaq : any,
    nonKosdaq : any,
}

const AssetPortfolioDetailSection = ({assetPortfolio, kosdaq, nonKosdaq} : AssetPortfolioDetailSectionPropsType) => {
    useEffect(() => {
        console.log('-----------------------------')
        console.log(assetPortfolio);
        console.log('-----------------------------')
    }, [assetPortfolio])

    useEffect(() => {
        console.log(nonKosdaq);
    }, [nonKosdaq])

    useEffect(() => {
        console.log(kosdaq)
    }, [kosdaq])
    return (
        <div className="asset-portfolio-detail-section-wrapper">
            {assetPortfolio.map((e : any) => <AssetDetailCard ticker={e.ticker} name={e.name} balance={e.balance} currentPrice={1} averagePrice={1} />)}
        </div>
    )
}
export default AssetPortfolioDetailSection;