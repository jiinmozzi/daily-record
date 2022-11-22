const express = require('express');
import {Request, Response} from "express";
import setAuth from "../middlewares/setAuth";
const router = express.Router();
const {Book, BookWishList, User} = require("../models");

interface IUserRequest extends Request {
    user: any
}

router.get('/books', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    const userBooks = user.books;
    const books : any[] = [];
    try {
        for (let i=0; i<userBooks.length; i++){
            books.push(await Book.findById(userBooks[i].toString()));
        }
        return res.status(200).send({
            status : 200,
            message : "OK",
            data : books,
        })
    }   catch (err) {
        return res.status(400).send({
            message : "FAIL",
            status : 400
        })
    }
});

router.get('/books/wishlists', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    const userBookWishlists = user.bookWishLists;

    const bookWishlists : any[] = [];
    try {
        for (let i=0; i<userBookWishlists.length; i++){
            bookWishlists.push(await Book.findById(userBookWishlists[i].toString()));
        }
        return res.status(200).send({
            status : 200,
            message : "OK",
            data : bookWishlists,
        })
    }   catch (err) {
        return res.status(400).send({
            message : "FAIL",
            status : 400
        })
    }
})

router.get('/history/:id', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    const {id} = req.params;
    try {
        const book = Book.findById(id.toString());
        return res.status(200).send({
            data : book,
            message : "OK",
            status : 200
        })
    }   catch (err){
        return res.status(400).send({
            message : "FAIL",
            status : 400
        })
    }
    
})

// title : string,
// authors : string[],
// genre : string,
// imageUrl : string,
// createdAt : string,
// isCompleted : {type : Boolean, default : false},
// ispublic : {type : Boolean, default : true},

router.post('/bookmark', setAuth, async(req : IUserRequest, res : Response) => {
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
        console.log("creating bookmarked book found error");
        return res.send({
            status : 400,
            message : "FAIL"
        })
        
        return;
    }
})
    
router.post('/library', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    // console.log(user);
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
        console.log("creating book found error");
        return res.status(400).send({
            message : "FAIL",
            status : 400,
        })
    }
})

router.delete('/bookmark/:id', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    const {id} = req.params;
    
    try {
        user.bookWishLists = user.bookWishLists.filter((e:any) => e.toString() !== id);
        await user.save();
        await BookWishList.findByIdAndDelete(id);
        return res.status(200).send({
            status : 200,
            message : "OK",
        })
    }   catch (err){
        return res.status(400).send({
            status : 400,
            message : "FAIL",
        })
    }
})

router.delete('/library/:id', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    const {id} = req.params;

    try {
        user.books = user.books.filter((e:any) => e.toString() !== id);
        await user.save();
        await Book.findByIdAndDelete(id);
        return res.status(200).send({
            status : 200,
            message : "OK",
        })
    }   catch (err){
        return res.status(400).send({
            status : 400,
            message : "FAIL",
        })
    }    
})

module.exports = router;
export {}