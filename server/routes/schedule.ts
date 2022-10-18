const express = require('express');
import {Request, Response} from "express";
const router = express.Router();
const {Schedule, User} = require("../models");
import setAuth from "../middlewares/setAuth";

interface IUserRequest extends Request {
    user: any
}

type ScheduleType = {
    user : string,
    dateForm : Date,
    dateTo : Date,
    title : string,
    content : string,
    createdAt : Date,
    isCompleted : boolean
}

router.get('/', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    const refreshToken = req.cookies.refreshToken;
    const userSchedules = user.schedules;
    const schedules : ScheduleType[] = [];
    userSchedules?.forEach((schedule : string) => {
        schedules.push(Schedule.findById(schedule));
    })
    return res.send({
        status : 200,
        message : "OK",
        data : schedules,
    })
})

router.post('/', setAuth, async(req : IUserRequest, res : Response) => {
    //
    return;
})

router.delete('/', setAuth, async(req : IUserRequest, res : Response) => {
    
    const user = req.user;
    const _id = req.body._id;
    user.schedules = user.schedules.filter((e : string )=> e!== _id);
    try {
        await Schedule.findByIdAndDelete(_id);
        await user.save();
    }   catch (err) {
        return res.status(500).send({
            stauts : 500,
            message : "FAIL",
        })
    }
    
    return res.status(200).send({
        status : 200,
        message : "OK",
    })
})

module.exports = router;
export {}