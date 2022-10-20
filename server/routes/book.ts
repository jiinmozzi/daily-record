const express = require('express');
import {Request, Response} from "express";
const router = express.Router();

// import User from '../models/User';
const {Book, User} = require("../models");

// const router = express.Router();

router.get('/', (req : Request, res : Response) => {
    console.log("router is on");
    return res.send({
        status : 200,
        message : "OK",
    })
})

router.get('/:query', (req : Request, res : Response) => {
    return;
})

module.exports = router;
export {}