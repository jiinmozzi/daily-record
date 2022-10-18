const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
import {Request, Response} from "express";

const router = express.Router();

const {User} = require("../models");

import verify from "../utils/verify";

import encryptPassword from "../utils/encryptPassword";
import generateRefreshToken from  "../utils/generateRefreshToken";
import generateAccessToken from  "../utils/generateAccessToken";

router.post('/signup', async(req : Request, res : Response) => {
    // const {name, id, password, email,birthday } = req.body;
    const password = req.body.password;
    const checkIdDuplicated = await User.findOne({ id : req.body.id });
    const checkEmailDuplicated = await User.findOne({ email : req.body.email });
    
    if ( checkIdDuplicated === null && checkEmailDuplicated === null ){
        const newUser = new User({
            ...req.body,
            password : encryptPassword(password)
        });
        try {
            await newUser.save();
            return res.status(200).send({
                data : newUser,
                msg : "OK",
            }) 
        }   catch (err){
            console.log(err);
            return res.status(503).send({
                msg : "server or network error",
            })
        } 
    }   else {
        if (checkIdDuplicated !== null){
            return res.status(500).send({
                msg : "duplicated id",
            })
        }   else {
            return res.status(500).send({
                msg : "duplicated email",
            })
        }
    }
});

router.post('/signin', async(req : Request, res : Response) => {
    const {id, password, autoLogin} = req.body;
    const user = await User.findOne({id : id});
    if ( !user ){
        return res.status(400).send({
            msg : "no user",
        })
    }
    if ( user.password !== encryptPassword(password) ){
        return res.status(403).send({
            msg : "wrong password",
        })
    }
    const name = user.name;
    const email = user.email;
    const accessToken = generateAccessToken();
    const fakeRefreshToken = generateRefreshToken(user.name, user.email);
    const refreshToken = generateRefreshToken(name, email);
     
    user.refreshToken = refreshToken;

    res.cookie('refreshToken', refreshToken, {maxAge : 90 * 24 * 60 * 60 * 1000, httpOnly : true});
    res.cookie('_refreshToken', fakeRefreshToken, {maxAge : 90 * 24 * 60 * 60 * 1000});

    if ( autoLogin ){
        const randomSessionId = crypto.randomBytes(16).toString('base64');
        const fakeRandomSessionId = crypto.randomBytes(16).toString('base64');
        user.sessionId = randomSessionId;
        res.cookie('sid', randomSessionId, { maxAge : 7 * 24 * 60 * 60 * 1000, httpOnly : true });
        res.cookie('_sid', fakeRandomSessionId, {maxAge : 7 * 24 * 60 * 60 * 1000});
    }
    await user.save();
    
    return res.status(200).send({
        data : {user, accessToken, refreshToken},
        msg : "OK",
    })
})
router.post('/reissue/access', async(req : Request, res : Response) => {
    if ( !req.cookies.refreshToken ){
        return res.status(401).send({
            status : 401, 
            message : "no refresh token",
        })
    }
    // no accessToken
    if (! req.body.accessToken ){
        return res.status(401).send({
            status : 401,
            message : "no access token",
        })
    }
    // accessToken too far away from now
    if ( Date.now()/1000 - verify(req.body.accessToken).exp > 7 * 24 * 60 * 60){
        return res.status(400).send({
            status : 400,
            message : "access token too old",
        })
    };
    
    const user = await User.findOne({ refreshToken : req.cookies.refreshToken });
    if ( !user ){
        return res.status(400).send({
            status : 400,
            message : "no user",
        })
    }
    
    const newAccessToken = generateAccessToken();
    return res.send({
        data : {accessToken : newAccessToken},
        status : 200,
        message : "OK",
    })
})
router.get('/signout', async(req : Request, res : Response) => {
    // const { sid, _sid, refreshToken, _refreshToken } = req.cookies;
    // console.log(req.cookies.sid);
    // console.log(req.cookies._sid); 
    // console.log(req.cookies.refreshToken);
    // console.log(req.cookies._refreshToken);
    res.clearCookie('sid')
    res.clearCookie('_sid')
    res.clearCookie("_refreshToken");
    res.clearCookie("refreshToken");
    res.send({
        stauts : 200,
        message : "OK",
    });
})



module.exports = router;
export {}