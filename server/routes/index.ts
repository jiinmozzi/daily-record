const express = require('express');
import {Request, Response} from "express";
import setAuth from "../middlewares/setAuth";
const router = express.Router();

// import User from '../models/User';
const {User} = require("../models");
// const router = express.Router();

interface IUserRequest extends Request {
    user: any
}

router.get('/', setAuth, (req : IUserRequest, res : Response) => {
    return res.send({
        status : 200,
        message : "OK",
    })
})

module.exports = router;
export {}