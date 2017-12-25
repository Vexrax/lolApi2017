const express = require('express');
var path = require('path');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(express.static(path.join(__dirname, '/../')));


app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + "/../../lolApi2017/index.html"));
    res.sendFile("C:/Users/Arek Fielding/Documents/Development/lolApi2017/index.html");
  
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


