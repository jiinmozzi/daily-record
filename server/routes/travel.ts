const express = require('express');
import {Request, Response} from "express";
const router = express.Router();
const {Travel, TravelWishList, User} = require("../models");
import setAuth from "../middlewares/setAuth";

interface IUserRequest extends Request {
    user: any
}

router.get('/', (req : Request, res : Response) => {
    return res.send({
        status : 200,
        message : "OK",
    })
})
router.get('/history', setAuth, (req : IUserRequest, res : Response) => {
    const user = req.user;
    const {visitedCountries, wishListCountries} = user;
    // const visitedCountries = user.visitedCountries;
    // const wishlistCountries = user.wishlistCountries
    
    return res.status(200).send({
        status : 200,
        message : "OK",
        data : {
            visitedCountries, wishListCountries
        }
    })
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

router.get('/:query', (req : Request, res : Response) => {
    return;
})

module.exports = router;
export {}