const express = require('express');
import {Request, Response} from "express";
import setAuth from "../middlewares/setAuth";
const router = express.Router();

// import User from '../models/User';
const {User} = require("../models");
// const router = express.Router();

router.get('/', setAuth, (req : Request, res : Response) => {
    console.log(req);
    console.log("router is on");
    
    return res.send({
        status : 200,
        message : "OK",
    })
})

module.exports = router;
export {}