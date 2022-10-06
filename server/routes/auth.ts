const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
import {Request, Response} from "express";

const router = express.Router();

const {User} = require("../models");

import encryptPassword from "../utils/encryptPassword";


router.post('/signin', async(req : Request, res : Response) => {
    const {id, password, autoLogin} = req.body;
    console.log(req.body);  
    console.log('autoLogin: ', autoLogin);
    //  req.cookies.sid
    const user = await User.findOne({id : id});
    if ( !user ){
        return res.status(400).send({
            msg : "no user",
        })
    }
    if ( user.password === encryptPassword(password) ){
        return res.status(403).send({
            msg : "wrong password",
        })
    }
    const name = user.name;
    const email = user.email.slice(0, user.email.indexOf('@'));
    const accessToken = jwt.sign({}, process.env.JWT_SECRET, {expiresIn : 30 * 60});
    const refreshToken = jwt.sign({name, email}, process.env.JWT_SECRET, {expiresIn : '90d'})
    user.refreshToken = user.refreshToken;

    let randomSessionId : string = "";
    if ( autoLogin ){
        randomSessionId = crypto.randomBytes(16).toString('base64');
        user.sessionId = randomSessionId;
        res.cookie('sid', randomSessionId, { maxAge : 7 * 24 * 60 * 60 * 1000 })
    }
    await user.save();
    
    return res.status(200).send({
        data : {accessToken, refreshToken},
        msg : "success",
    })
})

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
                msg : "success",
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

module.exports = router;
export {}