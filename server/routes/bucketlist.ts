const express = require('express');
import {Request, Response} from "express";
import setAuth from "../middlewares/setAuth";
const router = express.Router();
const {BucketList} = require("../models");

interface IUserRequest extends Request {
    user: any
}

router.get('/bucketlists', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    const userBucketlists = user.bucketLists;
    const bucketlists : any[] = [];
    try {
        for (let i=0; i<userBucketlists.length; i++){
            bucketlists.push(await BucketList.findById(userBucketlists[i].toString()));
        }
        return res.status(200).send({
            message : "OK",
            status : 200,
            data : bucketlists,
        })
    }   catch (err){
        return res.status(400).send({
            message : "FAIL",
            status : 400
        })
    }
});

// router.post('/')
module.exports = router;
export {}