import { Request, Response, NextFunction } from "express";
import generateAccessToken from "../utils/generateAccessToken";
const User = require('../models');
// const jwt = require('jsonwebtoken');

import verify from "../utils/verify";
require('dotenv').config();

interface IUserRequest extends Request {
    user: any
}

const setAuth = async(req : IUserRequest, res : Response, next : NextFunction) => {
    const accessToken = req.body.accessToken;
    const refreshToken = req.cookies.refreshToken;

    // access token is not expired
    // refresh token is not expired
    // console.log("access: ", accessToken);
    // console.log("verify(accessToken): ", verify(accessToken));
    // const x = verify(accessToken);

    const accessIsValid : boolean = verify(accessToken).exp >= Date.now()/1000;
    const refreshIsValid : boolean = refreshToken && verify(refreshToken).exp >= Date.now()/1000;
    
    // no access token arrived
    if ( !accessToken ){
        return res.status(401).send({
            status : 401,
            message : "no access token",
            redirectUrl : "/signin",
        })
    }

    // access token is here but expired
    
    if ( !accessIsValid ){
        return res.status(401).send({
            status : 401,
            message : "access token expired",
            redirectUrl : "/signin"
        })
    }
    
    // access token is here and valid
    if (!refreshToken){
        // not likely to happen;
        return;
    }
    // setAuth passed.
    req.user = await User.findOne({refreshToken : refreshToken})
    console.log(req.user);
    return next();
}

export default setAuth;