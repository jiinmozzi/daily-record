const express = require('express');
import {Request, Response} from "express";
import setAuth from "../middlewares/setAuth";
const {ProgrammingPortfolio, ProgrammingStudy, ProgrammingDaily, Keyboard} = require('../models');
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
        user.programmingPortfolios.push(newPortfolio._id);
        await user.save();
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

router.post('/study', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;

    const { classification, title, content, githubLink, siteUrl, imageUrl, isCompleted, isPublic } = req.body;
    const createdAt = new Date();
    
    try {
        const newStudy = new ProgrammingStudy({
            user, classification, title, content, githubLink, siteUrl, imageUrl, createdAt, isCompleted, isPublic
        })
        await newStudy.save();
        user.programmingStudies.push(newStudy._id);
        await user.save();
        return res.status(200).send({
            status : 200,
            message : "OK",
            data : newStudy,
        })
    }   catch (err){
        return res.status(400).send({
            message : "FAIL",
            status : 400,
        })
    }
})

router.get('/daily', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    const daily = user.programmingDailies;
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

router.post('/daily', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    const { title, content, siteUrl, imageUrl, isPublic } = req.body;
    const createdAt = new Date();

    try {
        const newDaily = new ProgrammingDaily({
            user, title, content, siteUrl, imageUrl, createdAt, isPublic
        })
        await newDaily.save();
        user.programmingDailies.push(newDaily._id);
        await user.save();
        return res.status(200).send({
            message : "OK",
            status : 200,
            data : newDaily,
        })
    }   catch (err){
        return res.status(400).send({
            message : "FAIL",
            status : 400,
        })
    }
})

router.get('/keyboard', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    const userKeyboard = user.keyboard;
    try {
        const keyboard = Keyboard.findById(userKeyboard._id);
        return res.status(200).send({
            message : "OK",
            status : 200,
        })
    }   catch (err){
        return res.status(400).send({
            message : "FAIL",
            status : 400,
        })
    }
})


// keyboard 모델에 키 하나하나가 저장된다고 보면 돼요
router.post('/keyboard', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    const {key, title, content, isPublic} = req.body;
    const createdAt = new Date();

    try {
        const newKeyboard = new Keyboard({
            user, key, title, content, createdAt, isPublic
        })
        await newKeyboard.save();
        user.keyboard.push(newKeyboard._id); 
        await user.save();
        return res.status(200).send({
            data : newKeyboard,
            status : 200,
            message : "OK",
        })
    }   catch (err){
        return res.status(400).send({
            status : 400,
            message : "FAIL",
        })
    }
})

router.post('/portfolio/history/:id', setAuth, async(req : IUserRequest, res : Response) => {
    const {id} = req.params;
    const portfolio = ProgrammingPortfolio.findById(id);
    const {title, content} = req.body;
    const createdAt = new Date();
    try {
        const history = {title, content, createdAt};
        portfolio.histories.push(history);
        await portfolio.save();
        return res.status(200).send({
            data : history,
            status : 200,
            message : "OK"
        })
    }   catch (err){
        return res.status(400).send({
            status : 400,
            message : "FAIL",
        }) 
    }
    

})
router.post('/study/history/:id', setAuth, async(req : IUserRequest, res : Response) => {
    const {id} = req.params;
    const study = ProgrammingStudy.findById(id);
    const {title, content} = req.body;
    const createdAt = new Date();
    try {
        const history = {title, content, createdAt};
        study.histories.push(history);
        await study.save();
        return res.status(200).send({
            data : history,
            status : 200,
            message : "OK"
        })
    }   catch (err){
        return res.status(400).send({
            status : 400,
            message : "FAIL",
        }) 
    }
})

router.post('/daily/history/:id', setAuth, async(req : IUserRequest, res : Response) => {
    const {id} = req.params;
    const daily = ProgrammingDaily.findById(id);
    const {title, content} = req.body;
    const createdAt = new Date();
    try {
        const history = {title, content, createdAt};
        daily.histories.push(history);
        await daily.save();
        return res.status(200).send({
            data : history,
            status : 200,
            message : "OK"
        })
    }   catch (err){
        return res.status(400).send({
            status : 400,
            message : "FAIL",
        }) 
    }
})

router.put('/toggle/portoflio/:id', setAuth, async(req : IUserRequest, res : Response) => {
    const {id} = req.params;
    try {
        const portfolio = await ProgrammingPortfolio.findById(id);
        portfolio.isCompleted = !portfolio.isCompleted;
        await portfolio.save();
        return res.status(200).send({
            message : "OK",
            data : portfolio,
            status : 200,
        })  
    }   catch (err){
        return res.status(400).send({
            message : "FAIL",
            status : 400,
        })
    }
})

router.put('/toggle/study/:id', setAuth, async(req : IUserRequest, res : Response) => {
    const {id} = req.params;
    try {
        const study = await ProgrammingStudy.findById(id);
        study.isCompleted = !study.isCompleted;
        await study.save();
        return res.status(200).send({
            message : "OK",
            data : study,
            status : 200,
        })  
    }   catch (err){
        return res.status(400).send({
            message : "FAIL",
            status : 400,
        })
    }
})

router.patch('/portfolio/:id', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    const {id} = req.params;
    try {
        let collection = ProgrammingPortfolio.findById(id);
        collection = {...collection, ...req.body}
        await collection.save();
        return res.status(200).send({
            message : "OK",
            status : 200,
            data : collection,
        })
    }   catch (err){
        return res.status(400).send({
            message : "FAIL",
            status : 400,
        })
    }
})

router.patch('/daily/:id', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    const {id} = req.params;
    
    try {
        let daily = ProgrammingDaily.findById(id);
        daily = {...daily, ...req.body};
        await daily.save();
        return res.status(200).send({
            message : "OK",
            status : 200,
            data : daily,
        })
    }   catch (err){
        return res.status(400).send({
            message : "FAIL",
            status : 400,
        }) 
    }
})


router.patch('/study/:id', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    const {id} = req.params;

    try {
        let study = ProgrammingStudy.findById(id);
        study = {...study, ...req.body};
        await study.save();
        return res.status(200).send({
            message : "OK",
            status : 200,
            data : study
        })
    }   catch (err){
        return res.status(400).send({
            message : "FAIL",
            status : 400,
        })
    }
})

router.patch('/keyboard/:id', setAuth, async(req : IUserRequest, res : Response) => {
    const {id} = req.params;

    try {
        let keyboard = Keyboard.findById(id);
        keyboard = {...keyboard, ...req.body};
        await keyboard.save();
        return res.status(200).send({
            message : "OK",
            status : 200,
            data : keyboard,
        })
    }   catch (err){
        return res.send({
            message : "FAIL",
            status : 400,
        })
    }
})


router.delete('/portfolio/:id', setAuth, async(req : IUserRequest, res : Response) => {
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

router.delete('/keyboard/:key', setAuth, async(req : IUserRequest, res : Response) => {
    const {key} = req.params;
    const user = req.user;
    
    const userKeyboards = user.keyboard;
    const keyboard : any[] = [];
    try {
        for (let i=0; i<userKeyboards.length; i++){
            keyboard.push(await Keyboard.findById(userKeyboards[i].toString()));
        }
        const target = keyboard.find((e : any) => e.key === key);
        const targetId = target._id;

        user.keyboard = user.keyboard.filter((e:any) => e.toString() !== targetId);
        await user.save();
        await Keyboard.findByIdAndDelete(targetId);
        return res.status(200).send({
            message : "OK",
            status : 200
        })
    }   catch (err){
        return res.status(400).send({
            message : "FAIL",
            status : 400,
        })
    }
})

module.exports = router;
export {}