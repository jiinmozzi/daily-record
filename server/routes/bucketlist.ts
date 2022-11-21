const express = require('express');
import {Request, Response} from "express";
import setAuth from "../middlewares/setAuth";
const router = express.Router();
const {Book, BookWishList, User} = require("../models");

interface IUserRequest extends Request {
    user: any
}

router.get('/bucketlists', setAuth, (req : IUserRequest, res : Request) => {
    const user = req.user;
    
});
module.exports = router;
export {}