/* eslint-disable no-process-env */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

const User = require('./models/user');
const app = express();

//server configs
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(session({
    secret: 'secretcode', //hashing the session id
    resave: true,
    saveUninitialized: false
}));

//make userId available in views
app.use(function(req, res, next) {
    res.locals.currentUser = req.session.userId;
    next();
});

//GET /register
app.get('/register', function(req, res) {
    //params (view, dynamic data)
    res.render('index', {page: 'register', notFound: false, alreadyExists: false });
});

//POST /register
app.post('/register', function(req, res) {
    if (req.body.username && req.body.password) {
        let userInfo = {
            username: req.body.username,
            password: req.body.password
        };

        User.create(userInfo, function(err, user) {
            if (err) {
                let error = new Error('User already exists');
                error.status = 401;
                return res.render('index', {page: 'register', notFound: false, alreadyExists: true});
            } else if (user) {
                return res.redirect('/');
            }
        });
    }
});

//GET /login
app.get('/', function(req, res) {
    res.render('index', {page: 'login', notFound: false, alreadyExists: false});
});

//POST /login
app.post('/', function(req, res) {
    if (req.body.username && req.body.password) {
        //using custom method from our model
        User.authUser(req.body.username, req.body.password, function(err, user) {
            if (err || !user) {
                let error = new Error('Invalid user or password');
                error.status = 401;
                return res.render('index', { page: 'login', notFound: true, alreadyExists: false});
            } else {
                req.session.userId = user._id;
                return res.redirect('/notes');
            }
        });
    }
});

//GET /notes
app.get('/notes', function(req, res, next) {
    //if user not logged in and session is not active
    if (!req.session.userId) {
        let err = new Error('Not Authorized');
        err.status = 403;
        return res.render('error');
    }
    User.findById(req.session.userId, function(error, user) {
        if (error) {
            return next(error);
        } else {
            return res.render('notes', {username: user.username, notes: user.notes});
        }
    });
});

//POST /notes
app.post('/notes', function(req, res, next) {
    if (req.body.modaltitle && req.body.modalcontent && req.body.userid) {
        //getting the date
        const date = new Date();
        const day = date.getDate();
        const month = date.toLocaleString('en-us', { month: 'long' });
        const time = date.toLocaleString('en-us', { hour12: true, hour: 'numeric', minute: 'numeric', timeZone: 'Asia/Kolkata' });
        const dateString = `${day} ${month}, ${time}`;

        let notesData = {
            $push: {
                notes: [
                    {
                        title: req.body.modaltitle,
                        content: req.body.modalcontent,
                        date: dateString
                    }
                ]
            }
        };

        //{new: true} to get the latest data
        User.findByIdAndUpdate(req.body.userid, notesData, {new: true}, function(err, user) {
            if (err) {
                return next(err);
            } else if (user) {
                return res.render('notes', { username: user.username, notes: user.notes });
            }
        });
    }
});

//GET /logout
app.get('/logout', function(req, res, next) {
    //if session is available
    if (req.session) {
        req.session.destroy(function(err) {
            if (err) {
                return next(err);
            } else {
                //session destroyed successfully
                return res.redirect('/');
            }
        });
    }
});

//mongoDB connectivity
mongoose.connect("mongodb+srv://fatehak:qwerty123@cluster0-8u0xa.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connection open`);
}).on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
});

//server port
const PORT = 3000;
app.listen(process.env.PORT || PORT);
