import React, {useState, useEffect, useRef} from "react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading";
import { useCallback } from "react";
import {AdvancedRealTimeChart, FundamentalData, TechnicalAnalysis, SingleTicker, SymbolInfo} from "react-ts-tradingview-widgets";
import getTodayExchangeRate from "../../api/getTodayExchangeRate";
import AssetSearchBar from "../../components/SearchBar/AssetSearchBar";
import AssetSearchSection from "../../components/Section/AssetSearchSection";

import "./AssetDetail.scss";
import getStockInfo from "../../api/getStock";

const AssetDetail = () => {
    const [assetData, setAssetData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [exchangeRate, setExchangeRate] = useState<number>(1);
    const navigate = useNavigate();
    const {ticker} = useParams();

    // const currentTicker = useRef<string>(ticker);
    useCallback(() => {
        if ( ticker && ticker.length > 0 ){
            const fetch = async() => {
                const res = await getStockInfo(ticker);
                setAssetData(res.data.data);
            }
            fetch();
        }
    }, [ticker])

    
    useCallback(() => {
        const fetchExchangeRate = async() => await getTodayExchangeRate();
        fetchExchangeRate().then(res => setExchangeRate(res.data.data));
    }, [])

    useEffect(() => {
        console.log(exchangeRate);
    }, [exchangeRate])

    const onKeyDown = (e : React.KeyboardEvent) => {
        if (e.key === "Tab"){
            e.preventDefault();
        }   
    }
    return (
         <div className="asset-detail-wrapper" onKeyDown={onKeyDown}>
            <AssetSearchSection />
                {/* <div >{ticker?.toUpperCase()} 주식 정보</div> */}
                <div id="ticker-indicator">
                    <SymbolInfo
                        symbol={ticker}
                        colorTheme="dark"
                        width={"100%"}
                        
                    />
                </div>
                <div id="asset-detail-main-section">
                    <div className="real-time-chart-wrapper">
                        <AdvancedRealTimeChart
                            theme="dark"
                            width={530}
                            height={300}
                            symbol={ticker}
                            interval="D"
                            timezone="Asia/Seoul"
                            autosize={false}
                            withdateranges={false}
                            hide_legend={false}
                            // style="1"
                            locale="en"
                            toolbar_bg="#f1f3f6"
                            hide_side_toolbar= {true}
                            hide_top_toolbar= {false}
                            allow_symbol_change={false}
                            container_id="tradingview_dcf24"
                        />
                    </div>
                    
                    <div className="asset-detail-main-right-section">
                        <div id="asset-detail-main-right-top">
                            <div id="asset-detail-portfolio-nav" onClick={() => navigate('/asset/portfolio')}>
                                내 포트폴리오 바로가기
                            </div>
                            <div id="asset-detail-mbti-nav">
                                투자 MBTI 테스트
                            </div>
                        </div>
                        <div id="asset-detail-main-right-bottom">
                            <div id="asset-detail-major-nav">포트폴리오에 추가하기</div>
                        </div>
                    </div>
                </div>
                <div className="asset-detail-informative">
                    <FundamentalData colorTheme="dark" symbol={ticker} displayMode="compact" height={480} width={"100%"}></FundamentalData>
                </div>
                <div className="asset-detail-opinion">
                    <TechnicalAnalysis
                        colorTheme="dark" 
                        
                        width={360}
                        height={400}
                        symbol={ticker}
                    />
                </div>
                <div style={{width : "100%", height : "400px"}}></div>
                
        </div>
    )
}

export default AssetDetail;