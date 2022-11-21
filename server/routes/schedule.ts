const express = require('express');
import {Request, Response} from "express";
const router = express.Router();
const {WeeklySchedule, Schedule} = require("../models");
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
    periodLength : Number,
    content : string,
    createdAt : Date,
    isCompleted : boolean,
    isPublic : boolean,
}

router.get('/schedules', setAuth, async(req : IUserRequest, res : Response) => {
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
    // console.log(schedules);
    return res.status(200).send({
        status : 200,
        message : "OK",
        data : schedules,
    })
})
router.get('/weekly', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    const userWeeklySchedules = user.weeklySchedules;

    const weeklySchedules : any[] = [];
    try {
        for (let i=0; i<userWeeklySchedules.length; i++){
            weeklySchedules.push(await WeeklySchedule.findById(userWeeklySchedules[i]));
        }
        
        return res.status(200).send({
            message : "OK",
            status : 200,
            data : weeklySchedules,
        })
    }   catch (err){
        return res.status(400).send({
            message : "FAIL",
            status : 400,
        })
    }
})

router.post('/schedule', setAuth, async(req : IUserRequest, res : Response) => {
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

router.post('/weekly', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    const {day, title, startTime, endTime, isPublic} = req.body
    
    try {
        const newWeeklySchedule = new WeeklySchedule({
            user : user._id,
            day,
            title,
            startTime,
            endTime,
            isPublic
        });
        await newWeeklySchedule.save();

        user.weeklySchedules.push(newWeeklySchedule._id);
        await user.save();

        return res.status(200).send({
            status : 200,
            message : "OK",
            data : newWeeklySchedule,
        })
    }   catch (err) {
        return res.status(400).send({
            status : 400,
            message : "FAIL",
        })
    }
})

router.post('/complete', setAuth, async( req : IUserRequest, res : Response ) => {
    const {_id} = req.body;
    console.log(_id);
    const schedule = await Schedule.findById(_id);
    schedule.isCompleted = !schedule.isCompleted;
    await schedule.save();
    return res.send({
        status : 200,
        message : "OK",
    })
})

router.patch('/schedule/:id', setAuth, async(req : IUserRequest, res : Response) => {
    const {id} = req.params;
    const {title, content} = req.body;
    // const user = req.user;
    
    try {
        const schedule = await Schedule.findById(id.toString());
        
        schedule.title = title;
        schedule.content = content;
        await schedule.save();
        return res.status(200).send({
            status : 200,
            message : "OK",
            data : schedule,
        })
    }   catch (err) {
        return res.send({
            message : "FAIL",
            status : 400,
            err,
        })
    }
    


})

router.delete('/schedule/:id', setAuth, async(req : IUserRequest, res : Response) => {
    const {id} = req.params;
    const user = req.user;
    
    user.schedules = user.schedules.filter((e : any )=> e.toString() !== id);
    
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

router.delete('/weekly/:id', setAuth, async(req : IUserRequest, res : Response) => {
    const {id} = req.params;
    const user = req.user;

    user.weeklySchedules = user.WeeklySchedules.filter((e : any) => e.toString() !== id);

    try {
        await WeeklySchedule.findByIdAndDelete(id);
        await user.save();
    }   catch (err) {
        return res.status(500).send({
            status : 500,
            message : "FAIL"
        })
    }
    return res.status(200).send({
        status : 200,
        message : "OK",
    })
})

module.exports = router;
export {}