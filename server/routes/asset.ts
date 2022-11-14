const express = require('express');
const yahooFinance = require('yahoo-finance'); 
import {Request, Response} from "express";
import axios from "axios";
import setAuth from "../middlewares/setAuth";
const router = express.Router();


interface IUserRequest extends Request {
    user: any
}

router.get('/:stock', (req : Request, res : Response) => {
    const {stock} = req.params;
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const date = new Date().getDate(); 
    yahooFinance.historical(
    {
        symbol : stock,
        
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
router.get('/portfolio', setAuth, (req : IUserRequest, res : Response) => {
    const user = req.user;

    const userPortfolio = user.asset;
})

module.exports = router;