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
const {Asset, AssetTradeHistory, News} = require('../models');
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
       
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const date = new Date().getDate(); 
    
    const portfolios : any[] = [];
    for (let i=0; i<userPortfolio.length; i++){
        portfolios.push(await Asset.findById(userPortfolio[i].toString()));
    }
    console.log(portfolios)
    const kosdaqStocks : any[] = [];
    const nonKosdaqStocks : any[] = [];
    
    for (let i=0; i<portfolios.length; i++){
        const stock = portfolios[i];
        if (!stock?.market) continue;
        if (stock?.market === "KOSDAQ") kosdaqStocks.push(stock.ticker);
        else if (stock?.market === "KOSPI") nonKosdaqStocks.push(stock.ticker + ".KS");
        else nonKosdaqStocks.push(stock?.ticker);
    }

    const today = getTodayEightDigitDate();
    console.log(today);
    const fetchKosdaqStock = async(ticker : string) => {
        // const requestURL = `https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=${process.env.GO_DATA_SERVICE_KEY}&likeSrtnCd=${ticker}&beginBasDt=${today-30000}&endBasDt=${today}&numOfRows=800&resultType=json`;
        const requestURL = `https://api.finance.naver.com/siseJson.naver?symbol=${ticker}&requestType=1&startTime=${today-30000}&endTime=${today}&timeframe=day`
        const res = await axios.get(requestURL);
        let data = res.data.split('\t\t\n').slice(1);
        data = data.slice(0, data.length - 1);
        data.forEach((stock:string) => stock.replace('\n', ''));
        data = data.map((e : string) => e.split(',\n')[0]);
        data = data.map((e : string) => JSON.parse(e));
        return data;
    }
    
    const fetchKosdaqStocks = async() => {
        const obj : any = {};
        for await (let stock of kosdaqStocks){
            await fetchKosdaqStock(stock).then(res => {
                obj[stock] = res;
                // console.log(res.data.response.body.items.item);
                // obj.push(res?.data?.response?.body?.items?.item);
            });
        }
        
        return obj;
    }
    fetchKosdaqStocks().then(response => {
        // console.log(response);
        yahooFinance.historical({
            symbols : nonKosdaqStocks,
            period : "d",
            from : `${year-3}-${month}-${date}`,
            to : `${year}-${month}-${date}`, 
            
        }, (err : any, quotes : any) => {
            if (err){
                return res.send({
                    status : 500,
                    message : "NOT GOOD",
                })
            }   
            else {
                return res.send({
                    status : 200,
                    message : "OK",
                    data : {kosdaq : response, nonKosdaq : quotes, portfolios : portfolios}
                })
            }
        })
    })
});

router.get('/fullname/:ticker', (req : Request, res : Response) => {
    const {ticker} = req.params;
    const assetName = getAssetFullName(ticker)?.stockName;
    return res.status(200).send({
        status : 200,
        data : assetName,
        message : "OK"
    })

})

router.get('/today/exchange', async(req : Request, res : Response) => {
    const response = await getExchangeRate();
   
    if (response.length === 0){
        return res.send({
            message : "FAIL",
            data : "EMPTY",
        })
    }
    return res.send({
        message : "OK",
        data : response[0].adjClose ? response[0].adjClose : response[1].adjClose ? response[1].adjClose : response[2].adjClose
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





router.post('/purchase/stock', setAuth, async( req : IUserRequest, res : Response ) => {
    const user = req.user;
    const userAsset = user.asset;
    const {ticker, quantity, price} = req.body;
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
                market : getAssetFullName(ticker)?.market,
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
        console.log(err);
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
    const {ticker, quantity, price} = req.body;
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
router.get('/news', async(req : Request, res : Response) => {
    try {
        const news = await News.find({});
        console.log(news);
        return res.status(200).send({
            message : "OK",
            status : 200,
            data : news,
        })    
    }   catch (err){
        return res.status(400).send({
            message : "FAIL",
            status : 400,
        })
    }
    
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

router.get('/:stock', (req : Request, res : Response) => {
    const {stock} = req.params;
    return res.status(200).send({
        message : "OK",
        data : filterStocksWithString(stock),
        status : 200,
    })
}) 



module.exports = router;