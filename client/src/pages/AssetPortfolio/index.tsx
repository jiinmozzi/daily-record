import axios from "axios";

import {useState, useEffect, useCallback} from "react";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../store/atom";
import AssetSearchSection from "../../components/Section/AssetSearchSection";
import AssetPortfolioSummarySection from "../../components/Section/AssetPortfolioSummarySection";
import AssetPortfolioGraphSection from "../../components/Section/AssetPortfolioGraphSection";
import AssetPortfolioDetailSection from "../../components/Section/AssetPortfolioDetailSection";
import "./AssetPortfolio.scss";
import getUserAssetPortfolio from "../../api/getUserAssetPortfolio";
import getTodayExchangeRate from "../../api/getTodayExchangeRate";

// export type AssetPortfolioType = {
//     name : string,
//     ticker : string,
//     sector? : string,
//     balance : number,
// }

const AssetPortfolio = () => {
    const [accessToken, setAccessToken] = useRecoilState<string>(accessTokenState);
    const [totalInvestmentAmount, setTotalInvestmentAmount] = useState<number>(0);
    const [currentEvaluatedAmount, setCurrentEvaluatedAmount] = useState<number>(1);
    const [assetPortfolio, setAssetPortfolio] = useState<any>([]);
    const [kosdaq, setKosdaq] = useState<any>({});
    const [nonKosdaq, setNonKosdaq] = useState<any>({});
    const [fetched, setFetched] = useState<boolean>(false); 
    const [exchangeRate, setExchangeRate] = useState<number>(1);
    useEffect(() => {
        if (accessToken){
            const fetch = async() => await getUserAssetPortfolio(accessToken);
            fetch().then(res => {
                setAssetPortfolio(res.data.portfolios);
                setKosdaq(res.data.kosdaq);
                setNonKosdaq(res.data.nonKosdaq);
                console.log(res);
            });
            const getExchangeRate = async() => await getTodayExchangeRate();
            getExchangeRate().then(res => setExchangeRate(res.data.data));
            setFetched(true);
        }
    }, [accessToken])

    
    useEffect(() => {
        let sum = 0;
        
        if (fetched && exchangeRate > 1 && assetPortfolio.length > 0){
            Object.keys(nonKosdaq).forEach((ticker) =>  {
                if (ticker.indexOf('.KS') !== -1){
                    sum += Number(nonKosdaq[ticker][0].close) * assetPortfolio.find((e : any) => e.ticker === ticker.replace('.KS', '')).balance;
                    // console.log("---------------------------------------")
                    // console.log(`${ticker}, ${assetPortfolio.find((e: any) => e.ticker === ticker.replace('.KS', '')).balance}, ${nonKosdaq[ticker][1].close}`)
                    // console.log("---------------------------------------")
                }   else {
                    sum += Number(nonKosdaq[ticker][0].close) * assetPortfolio.find((e:any) => e.ticker === ticker).balance * exchangeRate;
                    // console.log("---------------------------------------")
                    // console.log(`${ticker}, ${assetPortfolio.find((e: any) => e.ticker === ticker).balance}, ${nonKosdaq[ticker][1].close * exchangeRate}`)
                    // console.log("---------------------------------------")
                }
            })
            Object.keys(kosdaq).forEach((ticker) => {
                sum += kosdaq[ticker][kosdaq[ticker].length - 1][4] * assetPortfolio.find((e:any) => e.ticker === ticker).balance;
                // console.log("---------------------------------------")
                // console.log(`${kosdaq[ticker][kosdaq[ticker].length -2][4] * assetPortfolio.find((e:any) => e.ticker === ticker).balance}`)
                // console.log("---------------------------------------")
            })
            setCurrentEvaluatedAmount(sum);

            const sumOfInvestment = assetPortfolio.map((e : any) => e.averagePrice * e.balance).reduce((p : number,c : number) => p+c, 0);
            setTotalInvestmentAmount(sumOfInvestment)
            
        }
        
    }, [fetched, exchangeRate, assetPortfolio])

    return (
        <div className="asset-portfolio-wrapper">
            <AssetSearchSection />
            <div id="asset-portfolio-bottom-wrapper">
                <div id="asset-portfolio-bottom-left-wrapper">
                    <AssetPortfolioSummarySection assetPortfolio={assetPortfolio} currentEvaluatedAmount={currentEvaluatedAmount} totalInvestmentAmount={totalInvestmentAmount}/>
                    <AssetPortfolioGraphSection assetPortfolio={assetPortfolio}/>
                </div>
                <div id="asset-portfolio-bottom-right-wrapper">
                    <AssetPortfolioDetailSection assetPortfolio={assetPortfolio} kosdaq={kosdaq} nonKosdaq={nonKosdaq}/>
                </div>
            </div>
        </div>
    )
}

export default AssetPortfolio;