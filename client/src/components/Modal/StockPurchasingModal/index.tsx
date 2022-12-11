import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import sellStockAsset from "../../../api/sellStockAsset";
import purchaseStockAsset from "../../../api/purchaseStockAsset";
import getTodayExchangeRate from "../../../api/getTodayExchangeRate";
import "./StockPurchasingModal.scss";
import getAssetName from "../../../api/getAssetName";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../store/atom";

type StockPurchasingModalPropsType = {
    setShowPurchasingModal : (bool : boolean) => void,
    ticker : string,
}

// ticker, quantity, price

const StockPurchasingModal = ({ setShowPurchasingModal, ticker } : StockPurchasingModalPropsType ) => {
    const [accessToken, setAccessToken] = useRecoilState<string>(accessTokenState);
    const [currency, setCurrency] = useState<string>("usd");
    const [exchangeRate, setExchangeRate] = useState<number>(1301.23);
    const [assetName, setAssetName] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(1);
    const [price, setPrice] = useState<number>(1);
    const [rate, setRate] = useState<number>(1200);

    useEffect(() => {
        const fetchExchangeRate = async() => await getTodayExchangeRate();
        fetchExchangeRate().then(res => setExchangeRate(res.data));
        const fetchAssetName = async() => await getAssetName(ticker);
        fetchAssetName().then(res => setAssetName(res.data));
    }, [])

    const changeQuantity = (e : React.ChangeEvent) => {
        const target = e.target as HTMLInputElement; 
        setQuantity(Number(target?.value));
    }
    const changePrice = (e : React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        setPrice(Number(target?.value));
    }
    const changeRate = (e : React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        setRate(Number(target?.value));
    }
    const plusQuantity = (e : React.MouseEvent) => {
        if (quantity < 1){
            setQuantity(1);            
        }   else {
            setQuantity((prev) => prev + 1)
        }
    }
    
    const minusQuantity = (e : React.MouseEvent) => {
        if (quantity < 1){
            setQuantity(1);    
        }   else {
            setQuantity((prev) => prev - 1);
        }
    }
    
    const purchaseStock = async(e : React.MouseEvent) => {
        if (currency === 'usd'){
            const _price = price * rate;
            const purchaseRes = await purchaseStockAsset(accessToken, {ticker, quantity, price : _price});
            if (purchaseRes.message === "OK"){
                setShowPurchasingModal(false);
            }
        }   else {
            const purchaseRes = await purchaseStockAsset(accessToken, {ticker, quantity, price});
            if (purchaseRes.message === "OK"){
                setShowPurchasingModal(false);
            }
        }
    }

    return (
        <div className="stock-purchasing-modal-wrapper">
            <div className="stock-purchasing-modal-inner">
                <CloseRoundedIcon className="close-icon" onClick={() => setShowPurchasingModal(false)}/>
                <div id="currency-selection-part">
                    <div className="currency" id="currency-usd" style={{ backgroundColor : currency === "usd" ? "rgb(246,150,54)" : "#fff"}} onClick={() => setCurrency('usd')}>USD</div>
                    <div className="currency" style={{ backgroundColor : currency === "krw" ? "rgb(246,150,54)" : "#fff"}} onClick={() => setCurrency('krw')}>KRW</div>
                </div>
                <div id="purchasing-asset-ticker">
                    <div id="purchasing-ticker">{ticker}</div>
                    <div id="purchasing-assetname">{assetName}</div>
                </div>
                {currency === "usd" &&
                <div id="currency-exchange-rate">
                   현재 환율 : $1 = ₩{exchangeRate.toFixed(2)}
                </div>}
                <div id="purchasing-quantity-wrapper">
                    <div id="purchasing-quantity-text">수량</div>
                    <input id="quantity-input" type="number" onChange={changeQuantity} value={quantity}/>
                    <div className="quantity-controller" style={{ borderLeft : "1px solid black"}} onClick={plusQuantity}>+</div>
                    <div className="quantity-controller" onClick={minusQuantity}>-</div>
                </div>
                <div id="purchasing-price-wrapper">
                    <div id="purchasing-price-text">가격</div>
                    <input id="price-input" type="number" onChange={changePrice} defaultValue={price}/>
                    <span id="price-span">({currency === 'usd' ? "$" : "₩"})</span>
                </div>
                {
                currency === "usd" && <div id="purchasing-dollar-wrapper">
                    <div id="purchasing-dollar-text">환율</div>
                    <input id="dollar-input" type="number" onChange={changeRate} defaultValue={rate}/>
                    <span id="dollar-span">{currency === 'usd' ? "(₩/$)" : ""}</span>
                </div>
                }
                <div id="purchasing-sum-wrapper">
                    <div id="purchasing-sum-text">총액</div>
                    <input id="sum-input" type="number" value={ currency === 'usd' ? (price * quantity * rate).toFixed(1) : (price * quantity).toFixed(1)}/>
                    <span id="sum-span">₩</span>
                </div>
                <button id="purchase-btn" onClick={purchaseStock}>매수</button>
            </div>
        </div>
    )
}

export default StockPurchasingModal;

