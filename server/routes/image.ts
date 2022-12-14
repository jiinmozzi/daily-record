const express = require('express');
const fs = require('fs');

const multer = require('multer');
const path = require('path');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
import {Request, Response} from "express";

const router = express.Router();

interface PhotoRequest extends Request {
    file : any
}

AWS.config.update({
    accessKeyId : process.env.S3_ACCESS_KEY_ID,
    secretAccessKey : process.env.S3_SECRET_ACCESS_KEY,
    region : 'ap-northeast-2',
});

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

router.post('/', upload.single('img'), ( req : PhotoRequest, res : Response ) => {
    
    if (!req.file){
        return res.send({ 
            data : {
                url : ""
            },
            message : "EMPTY",
            status : 200,
        })
    }   
    return res.send({
        data : {
            url : req.file.location,
        },
        message : "OK",
        status : 200,
    })
})

module.exports = router;