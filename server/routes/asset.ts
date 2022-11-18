const express = require('express');
const fs = require('fs');
const yahooFinance = require('yahoo-finance'); 
import {Request, Response} from "express";
import axios from "axios";
import setAuth from "../middlewares/setAuth";
import getExchangeRate from "../utils/getExchangeRate";
import getAssetFullName from "../utils/getAssetFullname";
const {Asset, AssetTradeHistory} = require('../models');
const router = express.Router();

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

router.get('/:stock', (req : Request, res : Response) => {
    const {stock} = req.params;
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const date = new Date().getDate(); 
    
    yahooFinance.historical(
    {
        symbol : stock,
        period : "v",
        from : `${year-1}-${month}-${date}`,
        to : `${year}-${month}-${date}`, 
        
    }, (err : any, quotes : any) => {
        if (err){
            return res.send({
                status : 500,
                message : "NOT GOOD",
            })
        }   else {
            return res.send({
                status : 200,
                message : "OK",
                data : quotes,
            })
        }
    })
}) 
router.post('/add/stock', setAuth, async( req : IUserRequest, res : Response ) => {
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
                name : getAssetFullName(ticker),
                ticker,
                averagePrice : price,            
                sector : "",
                balance : quantity,
                exchangeRate,
                currency,
            });
            await newAsset.save();

            user.asset.push(newAsset._id);
            await user.save();
        }  
        // both has to be recorded in history 
        const newAssetHistory = new AssetTradeHistory({
            user : user._id,
            name : getAssetFullName(ticker),
            ticker,
            price,
            quantity,
            isPurchase : true,
        })
        await newAssetHistory.save();

    }   catch (err){
        return res.send({
            message : "FAIL",
            err,
        })
    }
})

// what if exchange rates are not there ? 
router.post('/sell/stock', ( req : IUserRequest, res : Response ) => {
    const user = req.user;

})

router.get('/portfolio', setAuth, (req : IUserRequest, res : Response) => {
    const user = req.user;

    const userPortfolio = user.asset;
})



module.exports = router;