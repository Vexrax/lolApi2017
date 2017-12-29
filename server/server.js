var envs = require('dotenv');
envs.config();
const express = require('express');
var path = require('path');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var analysisEngine = require('./analysisEngine');
var riotAPI = require('./riotAPI');
var riot = 'RGAPI-fbc73695-a956-4e07-b64c-bc2850f0ae03';
var analysis = new analysisEngine(riot);
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static(path.join(__dirname, '/../')));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + "/../../lolApi2017/index.html"));
});

app.get('/:region/:name?', function(req, res){
    res.sendFile(path.join(__dirname + "/../../lolApi2017/SummonerPage.html"));
    //console.log(req.body.name);
    //getMatchHistory()
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
    getMatchHistory(req.body.name);
    io.emit('modifyHTML', req.body.name);
    res.redirect('http://localhost:3000/' + req.body.region + '/' + req.body.name);
    res.sendFile(path.join(__dirname + "/../../lolApi2017/SummonerPage.html"));
});


io.on('connection', function(socket) {
    console.log("A user connected");
    socket.on('data', function(data) {
        console.log(data);
        io.emit("data", "ok");
    });
    //use this socket to get match history
    socket.on('getMatchHistory', function(data) {

    });
});






http.listen(3000, function(){
  console.log('listening on localHost:3000');
});


//functions
function getMatchHistory(name) {
    console.log("gettingHistory");
    riot.getRecentGamesByName(name, function(list, account) {
        console.log("ok");
        var runesList = getRunesForGames(list, account.accountId);
        var reccList;
        io.emit("matchHistory", account, list, runesList, reccList);
    });
}

function getRunesForGames(gameList, accId) {
    var gameRuneList = [], allGamesRuneList = [];
    var playerId = 0;
    for(var i in gameList) {
        var curGame = gameList[i];
        for(var t in curGame.participantIdentities) {
            if(curGame.participantIdentities[t].player.accountId == accId) {
                playerId = curGame.participantIdentities[t].participantId;
            }
        }
        //error check
        if(playerId == 0) {
            console.log("ERROR! runesForGames");
        }
        var stats = curGame.participants[playerId - 1].stats;
        gameRuneList.push(stats.perk0);
        gameRuneList.push(stats.perk1);
        gameRuneList.push(stats.perk2);
        gameRuneList.push(stats.perk3);
        gameRuneList.push(stats.perk4);
        gameRuneList.push(stats.perk5);
        allGamesRuneList.push(gameRuneList);
        gameRuneList = [];
    }
    return allGamesRuneList;
}
