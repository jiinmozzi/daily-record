import { Application } from "express";

const express = require('express');
const cookieParser = require('cookie-parser');
const app : Application= express();

// const NewsAPI = require('newsapi');
const AWS = require('aws-sdk');
const cors = require('cors');

const mongoose = require('mongoose');
const {News} = require("./models");
AWS.config.update({
    accessKeyId : process.env.S3_ACCESS_KEY_ID,
    secretAccessKey : process.env.S3_SECRET_ACCESS_KEY,
    region : 'ap-northeast-2',
});

// app.set('trust proxy', 1)
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use(express.json());

app.use(cors({
    origin: ["http://localhost:3000", "http://13.209.227.43:3000", "http://dailyrecord.me", "http://www.dailyrecord.me", "*"],
    credentials: true,
    sameSite: "none",
}));

app.use('/', require('./routes'));
app.use('/auth', require('./routes/auth'));
app.use('/asset', require('./routes/asset'));
app.use('/book', require('./routes/book'));
app.use('/bucketlist', require('./routes/bucketlist'));
app.use('/diary', require('./routes/diary'));
app.use('/schedule', require('./routes/schedule'));
app.use('/terminal', require('./routes/terminal'));
app.use('/travel', require('./routes/travel'));
app.use('/user', require('./routes/user'));
app.use('/fitness', require('./routes/fitness'));
app.use('/test', require('./routes/test'));
app.use('/image', require('./routes/image'));





require('dotenv').config();
const port = process.env.PORT;

const server = app.listen(port, () => {
    console.log(`Listening at port ${port}`);
    // const newsapi = new NewsAPI(process.env.NEWS_API_KEY);
    // newsapi.v2.topHeadlines({
    //     q: 'ethereum',
    //     category: 'business',
    //     language: 'en',
    //     country: 'us',
    //   }).then(async(response : any)=> {
    //     if (Number(response.totalResults > 0)){
    //         const {title, author, description, publishedAt, url, urlToImage} = response.articles[0];
    //         const news = new News({
    //             title,
    //             author,
    //             description,
    //             publishedAt,
    //             url,
    //             urlToImage,
    //         })
    //         await news.save();
    //         console.log(response);
    //     }
    //   });
})