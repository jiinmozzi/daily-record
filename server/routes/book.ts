const express = require('express');
import {Request, Response} from "express";
import setAuth from "../middlewares/setAuth";
const router = express.Router();
const {Book, User} = require("../models");

interface IUserRequest extends Request {
    user: any
}

router.get('/', (req : Request, res : Response) => {
    
    return res.send({
        status : 200,
        message : "OK",
    })
})
router.post('/create/library', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    console.log(user);
    const {title, authors, contents, datetime, price, thumbnail} = req.body;
    try {
        const newBook = new Book({
            user : user._id,
            title,
            authors,
            genre : "",
            imageUrl : thumbnail,
            comment : "",
            from : "",
            to : "",
            createdAt : Date.now(),
            datetime,
            contents,
            price,
            rating : 0,
        })
        await newBook.save();
        user.books.push(newBook._id);
        await user.save();
        return res.send({
            status : 200,
            message : "OK",
            data : newBook
        })
    }   catch (err) {
        console.log(err);
        console.log("creating book found error");
        return;
    }
    
})
router.get('/:query', (req : Request, res : Response) => {
    return;
})

module.exports = router;
export {}