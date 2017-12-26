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



app.use(express.static(path.join(__dirname, '/../')));


app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + "/../../lolApi2017/index.html"));
});

app.get('/:region/:userId', function(req, res){
    res.sendFile(path.join(__dirname + "/../../lolApi2017/SummonerPage.html"));
    console.log("data emitted");
});

io.on('connection', function(socket) {
    console.log("A user connected");
    socket.on('data', function(data) {
        console.log(data);
        io.emit("data", "ok. Cumming over");
    })
});



http.listen(3000, function(){
  console.log('listening on *:3000');
});


