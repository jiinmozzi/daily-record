const express = require('express');
import {Request, Response} from "express";
const router = express.Router();

// import User from '../models/User';
const {User} = require("../models");
// const router = express.Router();

router.get('/', (req : Request, res : Response) => {
    console.log("router is on");
    return res.send({
        status : 200,
        message : "connection success",
    })
})

module.exports = router;
export {}