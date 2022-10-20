const express = require('express');
import {Request, Response} from "express";
const router = express.Router();
const {Schedule, User} = require("../models");
import setAuth from "../middlewares/setAuth";

interface IUserRequest extends Request {
    user: any
}

type ScheduleType = {
    _id : string,    
    user : string,
    dateFrom : Date,
    dateTo : Date,
    title : string,
    content : string,
    createdAt : Date,
    isCompleted : boolean,
    isPublic : boolean,
}

router.get('/', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    
    const userSchedules = user.schedules;
    const schedules : ScheduleType[] = [];
    
    for (let i=0; i<userSchedules.length; i++){
        schedules.push(await Schedule.findById(userSchedules[i]));
    }
    // await userSchedules?.forEach(async(schedule : string) => {
    //     const _userSchedule : ScheduleType = await Schedule.findById(schedule);
    //     console.log(_userSchedule);
    //     schedules.push(_userSchedule);
    // })
    console.log(schedules);
    // console.log(schedules);
    return res.status(200).send({
        status : 200,
        message : "OK",
        data : schedules,
    })
})

router.post('/create', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    const {dateFrom, dateTo, title, content, isCompleted, isPublic} = req.body;
    try {
        const newSchedule = new Schedule({
            user : user._id,
            dateFrom,
            dateTo,
            title,
            content,
            isCompleted,
            isPublic,
            createdAt : Date.now(),
        })
        await newSchedule.save();

        user.schedules.push(newSchedule._id);
        await user.save();  
        return res.status(200).send({
            status : 200,
            message : "OK",
            data : newSchedule,
        });
    }   catch ( err ){
        console.error("creating schedule found error : ", err);
        return;
    }
})

router.delete('/:id', setAuth, async(req : IUserRequest, res : Response) => {
    const {id} = req.params;
    const user = req.user;
    
    user.schedules = user.schedules.filter((e : string )=> e !== id);
    
    try {
        await Schedule.findByIdAndDelete(id);
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