const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const postRouter = require('./Router/postRouter');
const authRouter = require('./Router/authRouter');
const tokenRouter = require('./Router/tokenRouter');

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/', postRouter);
app.use('/api/auth', authRouter);
app.use('/api/tokens', tokenRouter);

module.exports = app;
