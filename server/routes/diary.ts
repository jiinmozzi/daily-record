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
    const {date, title, content, emoji, isPublic} = req.body;
    console.log(req.body)
    const createdAt = new Date();
    try {
        const newDiary = new Diary({
            user,
            date,
            title,
            content,
            emoji,
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
        console.log(err);
        return res.status(400).send({
            
            message : "FAIL",
            status : 400,
        })
    }
})

router.get('/diary/image', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    if (!user.diaryImage){
        return res.status(400).send({
            message : "FAIL",
            data : null,
            status : 400,
        })
    }
    return res.status(200).send({
        data : user.diaryImage,
        stauts : 200,
        message : "OK",
    })
})

router.post('/diray/image', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    const {imageUrl} = req.body;
    user.diaryImage = imageUrl;
    try {
        await user.save();
        return res.status(200).send({
            data : imageUrl,
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

router.delete('/diary/:id', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    const {id} = req.params;
    try {
        user.diaries = user.diaries.filter((e : any) => e.toString() !== id);
        await user.save();
        await Diary.findByIdAndDelete(id);
        return res.status(200).send({
            status : 200,
            message : "OK"
        })
        
    }   catch (err){
        return res.status(400).send({
            message : "FAIL",
            status : 200,
        })
    }
})

// client가 관심 목록에 추가한 이모지
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
    const {emoji} = req.body;
    if (user.emoji.indexOf(emoji) === -1){
        user.emoji.push(emoji);
    }
    try{
        await user.save()
        return res.status(200).send({
            message : "OK",
            status : 200,
            data : emoji
        })
    }   catch (err){
        return res.status(400).send({
            message : "FAIL",
            status : 400,
        })
    }
})
router.delete('/emoji/:id', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    const {id} = req.params;
    try {
        user.emoji.filter((e:string) => e!== id);
        await user.save();
        return res.status(200).send({
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

router.patch('/diary/image', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    const {imageUrl} = req.body;
    user.diaryImage = imageUrl;
    try {
        await user.save();
        return res.status(200).send({
            message : "OK",
            data : imageUrl,
            status : 200
        })
    }   catch (err){
        return res.status(400).send({
            status : 400,
            message : "FAIL",
        }) 
    }
})

router.delete('/diary/image', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    user.diaryImage = "";
    try {
        await user.save();
        return res.status(200).send({
            message : "OK",
            status : 200,
        })
    }   catch (err){
        return res.status(400).send({
            message : "FAIL",
            status : 400
        })
    }
    
})

module.exports = router;
export {}