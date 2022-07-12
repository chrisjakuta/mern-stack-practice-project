const express = require('express');
const path = require('path');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { MongoClient, ServerApiVersion } = require('mongodb');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

uri = process.env.MONGODB_SERVER_URL;
const client = new MongoClient(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }
);


module.exports = {
    app,
    client,
};
