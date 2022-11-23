const express = require('express');
import e, {Request, Response} from "express";
import setAuth from "../middlewares/setAuth";
const router = express.Router();
const {BucketList, BucketWishList} = require("../models");

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

router.post('/bucketlist', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    const {imageUrl, title, comment, field, isCompleted, isPublic} = req.body; 
    const createdAt = new Date();
    try {
        const newBucketlist = new BucketList({
            user, imageUrl, createdAt, title, comment, field, isCompleted, isPublic,
        })
        await newBucketlist.save();
        user.bucketLists.push(newBucketlist._id);
        await user.save();
        return res.status(200).send({
            status : 200,
            message : "OK",
            data : newBucketlist,
        })
    }   catch (err){
        return res.status(400).send({
            message : "FAIL",
            status : 400
        })
    }
})

// 다 함 표시
router.post('/bucketlist/toggle', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    const {id} = req.body;

    
    try {
        const targetBucketlist = await BucketList.findById(id.toString());
        targetBucketlist.isCompleted = !targetBucketlist.isCompleted;
        await targetBucketlist.save();    
        return res.status(200).send({
            message : "OK",
            status : 200,
            data : targetBucketlist,
        })
    }   catch (err){
        return res.status(400).send({
            message : "FAIL",
            status : 400,
        })
    }
})

router.patch('/bucketlist/:id', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    const {id} = req.params;
    
    const {imageUrl, title, comment, field, isPublic} = req.body;
    try {
        const bucketlist = await BucketList.findById(id);
        const patchedBucketlist = {...bucketlist, ...req.body};
        await patchedBucketlist.save();
        return res.status(200).send({
            message : "OK",
            data : patchedBucketlist,
            status : 200,
        }) 
    }   catch (err){
        return res.status(400).send({
            message : "FAIL",
            status : 400,
        })
    }
})

router.post('/wishlist/toggle', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    const {id} = req.body;

    
    try {
        const targetWishlist = await BucketWishList.findById(id.toString());
        targetWishlist.isCompleted = !targetWishlist.isCompleted;
        await targetWishlist.save();    
        return res.status(200).send({
            message : "OK",
            status : 200,
            data : targetWishlist,
        })
    }   catch (err){
        return res.status(400).send({
            message : "FAIL",
            status : 400,
        })
    }
})


router.get('/wishlists', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    const userWishlists = user.bucketWishLists;

    const wishlists : any[] = [];
    try {
        for (let i=0; i<userWishlists.length; i++){
            wishlists.push(await BucketWishList.findById(userWishlists[i].toString()));
        }
        return res.status(200).send({
            message : "OK",
            status : 200,
            data : wishlists
        })  
    }   catch (err){
        return res.status(400).send({
            message : "FAIL",
            status : 400,
        })
    }
})

router.post('/wishlist', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    const {imageUrl, craetedAt, title, comment, field, isCompleted, isPublic} = req.body;

    try {
        const newWishlist = new BucketWishList({
            user, imageUrl, craetedAt, title, comment, field, isCompleted, isPublic
        })
        await newWishlist.save();
        user.bucketWishLists.push(newWishlist._id);
        await user.save();
        return res.status(200).send({
            status : 200,
            data : newWishlist,
            message : "OK",
        })
    }   catch (err){
        return res.status(400).send({
            status : 400,
            message : "FAIL",
        })
    }
})

router.patch('/wishlist/:id', setAuth, async(req : IUserRequest, res : Response) => {
    const user = req.user;
    const {id} = req.params;
    
    const {imageUrl, title, comment, field, isPublic} = req.body;
    try {
        const wishlist = await BucketWishList.findById(id);
        const patchedWishlist = {...wishlist, ...req.body};
        await patchedWishlist.save();
        return res.status(200).send({
            message : "OK",
            data : patchedWishlist,
            status : 200,
        }) 
    }   catch (err){
        return res.status(400).send({
            message : "FAIL",
            status : 400,
        })
    }
})

router.delete('/bucketlist/:id', setAuth, async(req : IUserRequest, res : Response) => {
    const {id} = req.params;
    const user = req.user;

    try {
        user.bucketLists = user.bucketLists.filter((e:any) => e.toString() !== id);
        await user.save();
        await BucketList.findByIdAndDelete(id);
        return res.status(200).send({
            message : "OK",
            status : 200,
        })
    }   catch (err){
        return res.status(400).send({
            message : "FAIL",
            status : 400,
        })
    }
})

router.delete('/wishlist/:id', setAuth, async(req : IUserRequest, res : Response) => {
    const {id} = req.params;
    const user = req.user;

    try {
        user.bucketWishLists = user.bucketWishLists.filter((e:any) => e.toString() !== id);
        await user.save();
        await BucketWishList.findByIdAndDelete(id);
        return res.status(200).send({
            message : "OK",
            status : 200,
        })
    }   catch (err){
        return res.status(400).send({
            message : "FAIL",
            status : 400,
        })
    }
})

// router.post('/')
module.exports = router;
export {}