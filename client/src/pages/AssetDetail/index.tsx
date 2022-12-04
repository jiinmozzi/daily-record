import React, {useState, useEffect, useRef} from "react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading";
import { useCallback } from "react";
import {AdvancedRealTimeChart, FundamentalData, TechnicalAnalysis, SingleTicker, SymbolInfo} from "react-ts-tradingview-widgets";
import ForwardRoundedIcon from '@mui/icons-material/ForwardRounded';
import QuizRoundedIcon from '@mui/icons-material/QuizRounded';
import getTodayExchangeRate from "../../api/getTodayExchangeRate";
import AssetSearchBar from "../../components/SearchBar/AssetSearchBar";
import AssetSearchSection from "../../components/Section/AssetSearchSection";
import StockPurchasingModal from "../../components/Modal/StockPurchasingModal";
import StockSellingModal from "../../components/Modal/stockSellingModal";
import "./AssetDetail.scss";
import getStockInfo from "../../api/getStock";
import { useRecoilState } from "recoil";
import { UserType } from "../../types";
import { userState } from "../../store/atom";

const AssetDetail = () => {
    const [assetData, setAssetData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [exchangeRate, setExchangeRate] = useState<number>(1);
    const [user, setUser] = useRecoilState<UserType>(userState);
    const [showPurchasingModal, setShowPurchasingModal] = useState<boolean>(false);
    const [showSellingModal, setShowSellingModal] = useState<boolean>(false);
    const navigate = useNavigate();
    const {ticker} = useParams();

    // const currentTicker = useRef<string>(ticker);
    useCallback(() => {
        console.log('hello useCallback');
        if ( ticker && ticker.length > 0 ){
            const fetch = async() => {
                const res = await getStockInfo(ticker);
                setAssetData(res.data.data);
            }
            fetch();
        }
    }, [ticker])
    
    // useEffect(() => {
    //     console.log(exchangeRate);
    //     console.log(ticker);
    // }, [exchangeRate, ticker])

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
                                <span id="my-portfolio-nav-top">내 포트폴리오 바로가기</span>
                                <span><ForwardRoundedIcon />&nbsp;&nbsp;{user.name}님의 포트폴리오</span>
                            </div>
                            <div id="asset-detail-mbti-nav" onClick={() => navigate('/asset/mbti')}>
                                <span>투자 MBTI 테스트</span>&nbsp;&nbsp;<QuizRoundedIcon />
                            </div>
                        </div>
                        <div id="asset-detail-main-right-bottom">
                            <div id="asset-detail-major-nav">
                                <div id="asset-detail-major-nav-text">포트폴리오에 추가하기</div>
                                <div className="asset-detail-major-btn-wrapper">
                                    <div className="asset-adjust-btn" id="asset-detail-buy-btn" onClick={() => setShowPurchasingModal(true)}>매수하기</div>
                                    <div className="asset-adjust-btn" id="asset-detail-sell-btn" onClick={() => setShowSellingModal(true)}>매도하기</div>
                                    {showPurchasingModal && <StockPurchasingModal setShowPurchasingModal={setShowPurchasingModal} ticker={ticker ? ticker : ""}/>}
                                    {showSellingModal && <StockSellingModal setShowSellingModal={setShowSellingModal} ticker={ticker ? ticker : ""}/>}
                                </div>
                                
                            </div>
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