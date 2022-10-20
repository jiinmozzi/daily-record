const express = require('express');
const crypto = require('crypto');
import {Request, Response} from "express";
const router = express.Router();

const {User} = require("../models");
import generateAccessToken from "../utils/generateAccessToken";
import generateRefreshToken from "../utils/generateRefreshToken";

router.get('/sid', async(req : Request, res : Response) => {
    if (!req.cookies.sid){
        return;
    }

    const user = await User.findOne({sessionId : req.cookies.sid});
    
    if (!user){
        return res.status(404).send({
            message : "no user",
        })
    }
    const accessToken = generateAccessToken();
    const fakeRefreshToken = generateRefreshToken(user.name, user.email);
    const refreshToken = generateRefreshToken(user.name, user.email);
    res.cookie('refreshToken', refreshToken, {maxAge : 90 * 24 * 60 * 60 * 1000, httpOnly : true});
    res.cookie('_refreshToken', fakeRefreshToken, {maxAge : 90 * 24 * 60 * 60 * 1000});

    const randomSessionId = crypto.randomBytes(16).toString('base64');
    const fakeRandomSessionId = crypto.randomBytes(16).toString('base64');

    user.sessionId = randomSessionId;
    user.refreshToken = refreshToken;
    res.cookie('sid', randomSessionId, { maxAge : 7 * 24 * 60 * 60 * 1000, httpOnly : true });
    res.cookie('_sid', fakeRandomSessionId, {maxAge : 7 * 24 * 60 * 60 * 1000});

    await user.save();
    return res.send({
        data : {user, accessToken, refreshToken, randomSessionId},
        status : 200,
        message : "OK",
    })
})
router.get('/refresh', async(req : Request, res : Response) => {
    if (! req.cookies.refreshToken ){
        return;
    }
    const refreshToken = req.cookies.refreshToken;
    const user = await User.findOne({refreshToken : req.cookies.refreshToken});
    console.log(user);
    if (!user){
        return res.status(404).send({
            message : "no user",
        })
    }
    const accessToken = generateAccessToken();
    return res.send({
        data : {user, accessToken, refreshToken},
        status : 200,
        message : "OK",
    })
})  

module.exports = router;
export {}