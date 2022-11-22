const express = require('express');
import {Request, Response} from "express";
import setAuth from "../middlewares/setAuth";
const {ProgrammingPortfolio, ProgrammingStudy, ProgrammingDaily} = require('../models');
const router = express.Router();
// const {Book, BookWishList, User} = require("../models");

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

router.post('/portfolio', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    const {dateFrom, dateTo, title, content, githubLink, siteUrl, imageUrl, isCompleted, onProcess, isPublic} = req.body;

    const createdAt = new Date();
    const newPortfolio = new ProgrammingPortfolio({
        user,
        dateFrom,
        dateTo,
        title,
        content,
        githubLink,
        siteUrl,
        imageUrl,
        createdAt,
        isCompleted,
        onProcess,
        histories : [],
        isPublic
    })
    try {
        await newPortfolio.save();
        return res.status(200).send({
            status : 200,
            message : "OK",
            data : newPortfolio
        })
    }   catch (err){
        return res.status(400).send({
            message : "FAIL",
            status : 400,
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

router.delete('/collection/:id', setAuth, async(req : IUserRequest, res : Response) => {
    const {id} = req.params;
    const user = req.user;

    user.programmingPortfolios = user.programmingPortfolios.filter((e : any )=> e.toString() !== id);
    
    try {
        await ProgrammingPortfolio.findByIdAndDelete(id);
        await user.save();
    }   catch (err) {
        return res.status(500).send({
            stauts : 500,
            message : "FAIL",
        })
    }
    return res.status(200).send({
        status : 200,
        message : "OK",
    })
})

router.delete('/study/:id', setAuth, async(req : IUserRequest, res : Response) => {
    const {id} = req.params;
    const user = req.user;

    user.programmingStudies = user.programmingStudies.filter((e : any )=> e.toString() !== id);
    
    try {
        await ProgrammingStudy.findByIdAndDelete(id);
        await user.save();
    }   catch (err) {
        return res.status(500).send({
            stauts : 500,
            message : "FAIL",
        })
    }
    return res.status(200).send({
        status : 200,
        message : "OK",
    })
})

router.delete('/daily/:id', setAuth, async(req : IUserRequest, res : Response) => {
    const {id} = req.params;
    const user = req.user;

    user.programmingDaily = user.programmingDaily.filter((e : any )=> e.toString() !== id);
    
    try {
        await ProgrammingDaily.findByIdAndDelete(id);
        await user.save();
    }   catch (err) {
        return res.status(500).send({
            stauts : 500,
            message : "FAIL",
        })
    }
    return res.status(200).send({
        status : 200,
        message : "OK",
    })
})

module.exports = router;
export {}