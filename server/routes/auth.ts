const express = require('express');
import {Request, Response} from "express";
const router = express.Router();

const {User} = require("../models");

import encryptPassword from "../utils/encryptPassword";


router.post('/signin', async(req : Request, res : Response) => {
    const {id, password, isRequired} = req.body;
    console.log("id :", id);
    console.log("password: ", password);
    console.log("isRequired: ", isRequired);    
})

router.post('/signup', async(req : Request, res : Response) => {
    // const {name, id, password, email,birthday } = req.body;
    const password = req.body.password;
    
    const newUser = new User({
        ...req.body,
        password : encryptPassword(password)
    });

    try {
        await newUser.save();
        return res.send({
            msg : "user signin completed",
            statusCode : 200,
        }) 
    }   catch (err){
        console.log(err);
        return res.send({
            msg : "User signin completed x",
            statusCode : 401,
        })
    }
})

module.exports = router;
export {}