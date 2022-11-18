const express = require('express');
import {Request, Response} from "express";
import setAuth from "../middlewares/setAuth";
const {ProgrammingPortfolio} = require('../models');
const router = express.Router();
const {Book, BookWishList, User} = require("../models");

interface IUserRequest extends Request {
    user: any
}
router.get('/portfolio', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    const portfolios = user.prgrammingPortfolios;
    const userPortfolios : any[] = [];
    try {
        for (let i=0; i<portfolios.length; i++){
            userPortfolios.push(await ProgrammingPortfolio.findById(portfolios[i]));
        }
        return res.send({
            status : 200,
            data : userPortfolios,
            message : "OK"
        })
    }   catch (err){
        return res.send({
            status : 500,
            message : "FAIL",
        })
    }
})

router.get('/study', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    const studies = user.programmingStudies;
    const userStudies : any[] = [];
    try {
        for (let i=0; i<studies.length; i++){
            userStudies.push(await ProgrammingPortfolio.findById(studies[i]));
        }
        return res.send({
            status : 200,
            data : userStudies,
            message : "OK"
        })
    }   catch (err){
        return res.send({
            status : 500,
            message : "FAIL",
        })
    }
})

router.get('/daily', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    const daily = user.programmingDaily;
    const userDailies : any[] = [];
    try {
        for (let i=0; i<daily.length; i++){
            userDailies.push(await ProgrammingPortfolio.findById(daily[i]));
        }
        return res.send({
            status : 200,
            data : userDailies,
            message : "OK"
        })
    }   catch (err){
        return res.send({
            status : 500,
            message : "FAIL",
        })
    }
})

module.exports = router;
export {}