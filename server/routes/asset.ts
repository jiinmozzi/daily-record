const express = require('express');
const request = require('request');
const fs = require('fs');
const yahooFinance = require('yahoo-finance'); 
import {Request, Response} from "express";
import axios from "axios";
import setAuth from "../middlewares/setAuth";
import getExchangeRate from "../utils/getExchangeRate";
import getAssetFullName from "../utils/getAssetFullname";
import getTodayEightDigitDate from "../utils/getTodayEightDigitDate";
import filterStocksWithString from "../utils/filterStocksWithString";
const {Asset, AssetTradeHistory} = require('../models');
const router = express.Router();


const likeSrtnCd=247540;
const beginBasDt=20201116;
const endBasDt=20221116;

const resultType='json'


interface IUserRequest extends Request {
    user: any
}

type AssetType = {
    user : string,
    name : string,
    ticker : string,
    averagePrice : number,
    sector : string,
    balance : number,
    exchangeRate : number,
    currency : string,
}
type AssetTradeHistoryType = {
    user : string,
    ticker : string,
    price : number,
    quantity : number,
    isPurchase : boolean,
    exchangeRate : number,
    currency : string,
}

router.get('/portfolio', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    const userPortfolio = user.asset;
       
    // const {stock} = req.params;
    // const year = new Date().getFullYear();
    // const month = new Date().getMonth() + 1;
    // const date = new Date().getDate(); 
    
    // yahooFinance.historical(
    // {
    //     symbols : [stock,"TSLA","V","IONQ"],
    //     period : "d",
    //     from : `${year-3}-${month}-${date}`,
    //     to : `${year}-${month}-${date}`, 
        
    // }, (err : any, quotes : any) => {
    //     if (err){
    //         return res.send({
    //             status : 500,
    //             message : "NOT GOOD",
    //         })
    //     }   else {
    //         return res.send({
    //             status : 200,
    //             message : "OK",
    //             data : quotes,
    //         })
    //     }
    // })
    const portfolios : any[] = [];
    for (let i=0; i<userPortfolio.length; i++){
        portfolios.push(await Asset.findById(userPortfolio[i].toString()));
    }

    const portfolio = [];
    
    const kosdaqStocks : any[] = [];
    const nonKosdaqStocks : any[] = [];

    for (let i=0; i<portfolios.length; i++){
        const stock = getAssetFullName(portfolios[i]);
        if (stock?.market === "KOSDAQ") kosdaqStocks.push(stock.ticker);
        else nonKosdaqStocks.push(stock?.ticker);
    }

    const today = getTodayEightDigitDate();
    
    const fetchKosdaqStock = async(ticker : string) => {
        const requestURL = `https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=${process.env.GO_DATA_SERVICE_KEY}&likeSrtnCd=${ticker}&beginBasDt=${today-30000}&endBasDt=${today}&numOfRows=800&resultType=json`;
        return await axios.get(requestURL);
    }
    
    const fetchKosdaqStocks = async() => {
        const arr : any[] = [];
        for await (let stock of kosdaqStocks){
            await fetchKosdaqStock(stock).then(res => {
                // console.log(res.data.response.body.items.item);
                arr.push(res?.data?.response?.body?.items?.item);
            });
        }
        return arr;
    }
    fetchKosdaqStocks().then(res => console.log(res));
})

router.get('/today/exchange', async(req : Request, res : Response) => {
    const response = await getExchangeRate();
    console.log(response);
    if (response.length === 0){
        return res.send({
            message : "FAIL",
            data : "EMPTY",
        })
    }
    return res.send({
        message : "OK",
        data : response[0].adjClose,
    }) 
})

router.get('/marketcap', async(req : Request, res : Response) => {
    const fetchData = async() => await axios.get('https://companiesmarketcap.com?download=csv');
    fetchData().then(response => {
        const datas = response.data.split('\n').slice(1, 31).map((e : string) => e.split(','))
        return res.status(200).send({
            data : datas,
            messsage : "OK",
            status : 200,
        })
    });
}) 

router.get('/:stock', (req : Request, res : Response) => {
    const {stock} = req.params;
    
    return res.status(200).send({
        message : "OK",
        data : filterStocksWithString(stock),
        status : 200,
    })
}) 



router.post('/purchase/stock', setAuth, async( req : IUserRequest, res : Response ) => {
    const user = req.user;
    const userAsset = user.asset;
    const {ticker, quantity, price, currency, exchangeRate} = req.body;
    const assets : any[] = [];

    // retrieve req.user's asset account
    for ( let i=0; i<userAsset.length; i++){
        assets.push(await Asset.findById(userAsset[i].toString()));
    }
    
    const asset = assets.find((e : AssetType) => e.ticker === ticker);
    // asset with certain ticker already exists
    try {
        if (asset){
            asset.averagePrice = (asset.averagePrice * asset.balance + price * quantity) / (asset.balance + quantity);
            asset.exchangeRate = (asset.exchangeRate * asset.balance + exchangeRate * quantity) / (asset.balance + quantity); 
            asset.balance = asset.balance + quantity;
            await asset.save();

        }   
        else {
            const newAsset = new Asset({
                user : user._id,
                name : getAssetFullName(ticker)?.stockName,
                ticker,
                averagePrice : price,            
                sector : "",
                balance : quantity,
                exchangeRate,
                currency,
                marget : getAssetFullName(ticker)?.market,
            });
            await newAsset.save();

            user.asset.push(newAsset._id);
            await user.save();
        }  
        // both has to be recorded in history 
        
        const newAssetHistory = new AssetTradeHistory({
            user : user._id,
            name : getAssetFullName(ticker)?.stockName,
            ticker,
            price,
            quantity,
            isPurchase : true,
            market : getAssetFullName(ticker)?.market
        })
        await newAssetHistory.save();
        return res.send({
            message : "OK",
            status : 200,
            data : {
                asset : user.asset,
                newAssetHistory
            }
        })
    }   catch (err){
        return res.send({
            message : "FAIL",
            err,
        })
    }
})

// what if exchange rates are not there ? 
router.post('/sell/stock', async( req : IUserRequest, res : Response ) => {
    const user = req.user;
    const userAsset = user.asset;
    const {ticker, quantity, price, currency, exchangeRate} = req.body;
    const assets : any[] = [];
    
    for (let i=0; i<userAsset.lenght; i++){
        assets.push(await Asset.findById(userAsset[i].toString()));
    }

    const asset = assets.find((e : AssetType) => e.ticker === ticker);
    
    if (!asset || asset.balance < quantity){
        return res.send({
            message : "FAIL",
            status : 400,
        })
    }
    try {
        asset.balance -= quantity;
        await asset.save();

        const newAssetHistory = new AssetTradeHistory({
            user : user._id,
            name : getAssetFullName(ticker)?.stockName,
            ticker,
            price,
            quantity,
            isPurchase : false,
            market : getAssetFullName(ticker)?.market
        })
        await newAssetHistory.save();
        return res.send({
            message : "OK",
            status : 200,
            data : {
                asset : user.asset,
                newAssetHistory
            }
        })
    }   catch (err){
        return res.send({
            message : "FAIL",
            status : 500,
        })
    }
    // adjust balance ;    
})

router.post('/mbti', setAuth, (req : IUserRequest, res : Response) => {
    const user = req.user;
    const {assetMBTI} = req.body;
    user.assetMBTI = assetMBTI;
    try {
        user.save();
        return res.status(200).send({
            message : "OK",
            data : assetMBTI,
            status : 200
        })
    }   catch (err){
        return res.status(500).send({
            message : "FAIL",
            status : 500,
        })
    }
})





module.exports = router;