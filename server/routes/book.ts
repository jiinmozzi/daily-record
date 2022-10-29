const express = require('express');
import {Request, Response} from "express";
import setAuth from "../middlewares/setAuth";
const router = express.Router();
const {Book, BookWishList, User} = require("../models");

interface IUserRequest extends Request {
    user: any
}

router.get('/', (req : Request, res : Response) => {
    
    return res.send({
        status : 200,
        message : "OK",
    })
})
// title : string,
// authors : string[],
// genre : string,
// imageUrl : string,
// createdAt : string,
// isCompleted : {type : Boolean, default : false},
// ispublic : {type : Boolean, default : true},

router.post('/create/bookmark', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    
    const {title, authors, contents, datetime, price, thumbnail} = req.body;
    try {
        const newBookMarkedBook = new BookWishList({
            user : user._id,
            title,
            authors,
            genre : "",
            contents : contents,
            imageUrl : thumbnail,
            datetime,
            createdAt : Date.now(),
            price,
        })
        await newBookMarkedBook.save();
        user.bookWishLists.push(newBookMarkedBook._id);
        await user.save();
        return res.send({
            status : 200,
            message : "OK",
            data : newBookMarkedBook,
        })
    }   catch (err){
        console.log(err);
        console.log("creating bookmarked book found error");
        return;
    }
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