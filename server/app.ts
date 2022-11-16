import { Application } from "express";

const express = require('express');
const cookieParser = require('cookie-parser');
const app : Application= express();

const mongoose = require('mongoose');
const cors = require('cors');

app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use(express.json());

app.use(cors({
    origin: ["http://localhost:3000"],
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



require('dotenv').config();
const port = process.env.PORT;

const server = app.listen(port, () => {
    console.log(`Listening at port ${port}`);
})

