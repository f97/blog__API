const express = require('express');
const path = require('path');
const cors = require('cors');
const indexRouter = require('./routes/index');

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', indexRouter);

module.exports = app;
