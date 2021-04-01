const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

mongoose.connect('mongodb+srv://pravin-node-rest:Node@707@node-rest-app.whuxy.mongodb.net/TdVoiceRecDB?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(morgan('dev'));

const notificationRoutes = require('./api/routes/Notification');
const userRoutes = require('./api/routes/User');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());
// print api log
app.use(morgan('dev'));

app.use('/notification', notificationRoutes);
app.use('/user', userRoutes);

module.exports = app;