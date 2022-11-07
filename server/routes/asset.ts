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
    const {stock} = req.params
    
    // const fetch = async() => await axios.get(`https://finance.yahoo.com/quote/${stock}?p=${stock}`).then(res => console.log(res.data));
    // fetch();
    yahooFinance.historical(
    {
        symbol : stock,
        from : '2021-11-07',
        to : '2022-11-07',
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
    // return res.send({
    //     status : 200,
    //     message : "OK",
    //     data : stock,
    // })
}) 


module.exports = router;