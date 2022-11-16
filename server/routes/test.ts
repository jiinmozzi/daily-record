const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
import {Request, Response} from "express";

const router = express.Router();

interface PhotoRequest extends Request {
    file : any
}

try {
    fs.readdirSync('uploads');
}   catch (error){
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
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

router.post('/img', upload.single('img'), ( req : PhotoRequest, res : Response ) => {
    console.log(req.file);
    res.json({ url : req.file.location });
})

module.exports = router;