var envs = require('dotenv');
envs.config();
const express = require('express');
var path = require('path');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var analysisEngine = require('./analysisEngine');
var riotAPI = require('./riotAPI');
var riot = new riotAPI(process.env.RIOT_KEY);
var analysis = new analysisEngine(riot);
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static(path.join(__dirname, '/../')));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + "/../../lolApi2017/index.html"));
});

app.get('/:region/:name?', function(req, res){
    res.sendFile(path.join(__dirname + "/../../lolApi2017/SummonerPage.html"));
    console.log("data emitted");
});

app.get('/test', function(req, res){
    res.sendFile(path.join(__dirname + "/../../lolApi2017/404.html"));
});

app.get('/:region', function(req, res){
    res.sendFile(path.join(__dirname + "/../../lolApi2017/404.html"));
    console.log("Serving 404");

});

app.post('/', urlencodedParser, function (req, res) {
    console.log(req.body);
    res.redirect('http://localhost:3000/' + req.body.region + '/' + req.body.name);
    res.sendFile(path.join(__dirname + "/../../lolApi2017/SummonerPage.html"));
});


io.on('connection', function(socket) {
    console.log("A user connected");
    socket.on('data', function(data) {
        console.log(data);
        io.emit("data", "ok. Cumming over");
    });
    //use this socket to get match history
    socket.on('getMatchHistory', function(data) {
        console.log("received");
        riot.getRecentGamesByName("earleking", function(list) {
            console.log("ok");
            io.emit("matchHistory", list);
        });
    });
});





http.listen(3000, function(){
  console.log('listening on *:3000');
});


