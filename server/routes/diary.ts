const express = require('express');
import {Request, Response} from "express";
import setAuth from "../middlewares/setAuth";
const router = express.Router();
const {Diary} = require("../models");

interface IUserRequest extends Request {
    user: any
}

router.get('/diaries', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    const userDiaries = user.diaries;

    const diaries : any[] = [];
    try {
        for (let i=0; i<userDiaries.length; i++){
            diaries.push(await Diary.findById(userDiaries[i].toString()));
        }
    
        return res.status(200).send({
            message : "OK",
            status : 200,
            data : diaries,
        })
    }   catch (err){
        return res.status(400).send({
            status : 400,
            message : "FAIL",
        })
    }
})
router.post('/diary', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    const {date, title, content, emojiCode, imageUrl, createdAt, isPublic} = req.body;

    try {
        const newDiary = new Diary({
            user,
            date,
            title,
            content,
            emojiCode,
            imageUrl,
            createdAt,
            isPublic,
        })
        await newDiary.save();
        user.diaries.push(newDiary._id);
        await user.save();
        return res.status(200).send({
            message : "OK",
            status : 200,
            data : newDiary,
        })
    }   catch (err){
        return res.status(400).send({
            message : "FAIL",
            status : 400,
        })
    }
})

// client가 추가한 이모지
router.get('/emoji', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    const userEmojies = user.emoji;

    return res.status(200).send({
        message : "OK",
        status : 200,
        data : userEmojies
    })
})

router.post('/emoji', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    const {emojiCode} = req.body;
    user.emoji.push(emojiCode);
    try{
        await user.save()
        return res.status(200).send({
            message : "OK",
            status : 200,
            data : emojiCode
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