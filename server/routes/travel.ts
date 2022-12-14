const express = require('express');
import axios from "axios";
import {Request, Response} from "express";
const router = express.Router();
const {Travel, TravelWishList, User} = require("../models");
const path = require('path');
const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

import setAuth from "../middlewares/setAuth";

interface IUserRequest extends Request {
    user: any
}

interface PhotoRequest extends IUserRequest {
    file : any
}

const upload = multer({
    storage : multerS3({
        s3 : new AWS.S3(),
        bucket : 'daily-record',
        key(req : any, file : any, cb : any){
            cb(null, `original/${Date.now()}${path.basename(file.originalname)}`);
        },
    }),
    limits : {fileSize : 5 * 1024 * 1024},
});

router.get('/', (req : Request, res : Response) => {
    return res.send({
        status : 200,
        message : "OK",
    })
})

//for flags and coloring
router.get('/history', setAuth, (req : IUserRequest, res : Response) => {
    const user = req.user;
    const {visitedCountries, wishListCountries} = user;
    
    return res.status(200).send({
        status : 200,
        message : "OK",
        data : {
            visitedCountries, wishListCountries
        }
    })
})

router.get('/stories', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    const {travels, travelWishLists} = user;

    const visitedTravelStories : any[] = [];
    const wishListTravelStories : any[] = [];
    try {
        for (let i=0; i<travels.length; i++){
            visitedTravelStories.push(await Travel.findById(travels[i].toString()));
        }
        for (let i=0; i<travelWishLists.length; i++){
            wishListTravelStories.push(await TravelWishList.findById(travelWishLists[i].toString()));
        }
        return res.send({
            message : "OK",
            status : 200,
            data : {
                visitedTravelStories,
                wishListTravelStories
            }
        })
    }   catch (err){
        return res.send({
            message : "FAIL",
            status : 400,
        })
    }
})

router.post('/history/toggle', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    const {country, type} = req.body;
    if (type === "VISITED"){
        if (user.visitedCountries.indexOf(country) !== -1){
            user.visitedCountries = user.visitedCountries.filter((e:string) => e !== country);
        }   else {
            user.visitedCountries.push(country);
        }
        await user.save();
    }   
    else if (type === "WISHLIST"){
        if (user.wishListCountries.indexOf(country) !== -1){
            user.wishListCountries = user.wishListCountries.filter((e:string) => e !== country);
        }   else {
            user.wishListCountries.push(country);
        }
        await user.save();
    }
    return res.status(200).send({
        status : 200,
        message : "OK",
        
    })
})


router.post('/story/visited', setAuth, async(req : PhotoRequest, res : Response) => {
    const user = req.user;
    const {country, city, title, locations, comment, departureDate, arrivalDate, duration, isPublic, imageUrl} = req.body;
    const createdAt = new Date(Date.now());
    try {
        const newTravelHistory = new Travel({
            user : user._id,
            country,
            city,
            imageUrl,
            locations,
            title,
            comment,
            createdAt,
            departureDate,
            arrivalDate,
            duration,
            isPublic
        })
        await newTravelHistory.save();
        user.travels.push(newTravelHistory._id);
        await user.save();
        return res.send({
            message : "OK",
            status : 200,
            data : newTravelHistory,
        });
    }   catch (err){
        return res.send({
            message : "FAIL",
            status : 500,
        })
    }
})

router.post('/story/wishlist/create', setAuth, async(req : PhotoRequest, res : Response) => {
    const user = req.user;
    const {country, city, imageUrl, createdAt, title, comment, isPublic} = req.body;
    try {
        const newTravelWishList = new TravelWishList({
            user, country, city, imageUrl, createdAt, title, comment, isPublic
        })
        await newTravelWishList.save();
        user.travelWishLists.push(newTravelWishList._id);
        await user.save();
        return res.send({
            message : "OK",
            status : 200,
            data : newTravelWishList,
        })
    }   catch (err){
        return res.send({
            message : "FAIL",
            status : 500,
        })
    }
})

router.delete('/story/delete/:id', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    const {id} = req.params;

    try {
        user.travels = user.travels.filter((e:any) => e.toString() !== id);
        await user.save();
        await Travel.findByIdAndDelete(id);
        await TravelWishList.findByIdAndDelete(id);
        return res.status(200).send({
            status : 200,
            message : "OK"
        })
    }   catch (err){
        return res.status(400).send({
            message : "FAIL",
            status : 400,
        })
    }
})

router.get('/google/map/:searchQuery', async(req : Request, res : Response) => {
    const {searchQuery} = req.params;
    const fetch = async() => await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(searchQuery)}&inputtype=textquery&language=ko&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&key=${process.env.GOOGLE_MAP_API_KEY}`);
    fetch().then((response) => {
        console.log(response)
        const json = JSON.stringify(response.data);
        
        const data = JSON.parse(json);
        return res.send({
            message : "OK",
            data : data,
            status : 200,
        })
    })
})
// router.post('/map', async(req : IUserRequest, res : Response) => {
//     const {location} = req.body;
//     console.log(location);
//     return res.send({
//         status : 200,
//         message : "OK"
//     })
// })

module.exports = router;
// findplacefromtext
