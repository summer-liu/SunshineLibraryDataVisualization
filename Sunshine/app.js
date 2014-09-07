var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var DataProvider = require('./dataProvider').DataProvider;

// var mongoose = require('mongoose');
// var express = require("express");

// mongoose.connect('mongodb://localhost/sunshine');

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));

// var DataSchema = require('./schema.js');
// var userdata = DataSchema.model("Userdata");

var app = express();
var router = express.Router();

app.set('port', process.env.PORT || 3000);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


var dataProvider = new DataProvider();

// Make our db accessible to our router
// app.use(function(req,res,next){
//     req.collection = userdata;
//     next();
// });

//app.use('/', routes);
//app.use('/users', users);

app.get('/',function(req,res){
    dataProvider.AllData(function(err,AllData){
        if (err) console.error(err);
        console.log(AllData.problemData);
        res.render('index',{
            allData : AllData
        })
    })
})




/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(3000);
console.log("Listening at port 3000....")

module.exports = app;
