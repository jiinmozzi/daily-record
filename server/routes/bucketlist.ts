const express = require('express');
import {Request, Response} from "express";
import setAuth from "../middlewares/setAuth";
const router = express.Router();
const {Book, BookWishList, User} = require("../models");

interface IUserRequest extends Request {
    user: any
}

module.exports = router;
export {}