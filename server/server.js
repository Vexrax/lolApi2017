var envs = require('dotenv');
envs.config();
const express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var analysisEngine = require('./analysisEngine');
var riotAPI = require('./riotAPI');
var riot = new riotAPI(process.env.RIOT_KEY);
var mySQL = require('./mySQL');
var sql = new mySQL();
var analysis = new analysisEngine(riot);
//analysis.setUp();//set it up bois
var bodyParser = require('body-parser');


var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static(path.join(__dirname, '/../')));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + "/../../lolApi2017/index.html"));
});

app.get('/:region/:name?', function(req, res){
    res.sendFile(path.join(__dirname + "/../../lolApi2017/SummonerPage.html"));

});
//homePage Button
app.post('/:region/:name?', function(req, res){
    res.redirect('https://runicinsight.herokuapp.com/');

});

app.get('/test', function(req, res){
    res.sendFile(path.join(__dirname + "/../../lolApi2017/404.html"));
});

app.get('/:region', function(req, res){
    res.sendFile(path.join(__dirname + "/../../lolApi2017/404.html"));
    console.log("Serving 404");
});

app.post('/', urlencodedParser, function (req, res) {
    riot.nameToProfile(req.body.name, function(profile) {
        riot.changeRegion(req.body.region);
        if(profile.name) {
            res.redirect('https://runicinsight.herokuapp.com/' + req.body.region + '/' + profile.name);
        }
        else {
            console.log("No Summoner Found");
            io.emit("noSummFound");
        }
    });
    //res.sendFile(path.join(__dirname + "/../../lolApi2017/SummonerPage.html"));
});


io.on('connection', function(socket) {
    console.log("A user connected");
    socket.on('data', function(data) {
        console.log("hi" + data);
        //io.emit("data", "ok");
    });
    var name = socket.handshake.headers.referer.split("/");
    name = name[name.length - 1];
    //io.emit('modifyHTML', name);
    io.to(socket.id).emit('modifyHTML', name);
    //use this socket to get match history
    socket.on('getMatchHistory', function() {
        getMatchHistory(name, socket.id);
    });
});






http.listen(process.env.PORT || 3000, function(){
    console.log('listening on localhost:3000');
});


//functions
function getMatchHistory(name, socketId) {
    console.log("gettingHistory");

    riot.getRecentGamesByName(name, function(list, account) {
        if(list == "error") console.log("No games played");
        else {
            var runesList = getRunesForGames(list, account.accountId);
            var reccList;

            idListToNameList(runesList[2], function(champNameList) {
                analysis.summonerAnalysis(list, runesList[1], runesList[0], function(nRuneList, nPaths) {
                    var runePath = analysis.getRuneTrees(runesList[0]);
                    io.to(socketId).emit("matchHistory", account, list, runesList[1], runesList[0], runePath, nRuneList, nPaths, champNameList, analysis.getRuneTree());
                });

            });
            //runesList[1] is the list of participant ids
        }

   });
}

function getRunesForGames(gameList, accId) {
    var gameRuneList = [], allGamesRuneList = [], idList = [], returnList = [], champList = [];
    var playerId = 0;
    for(var i in gameList) {
        var curGame = gameList[i];
        for(var t in curGame.participantIdentities) {
            if(curGame.participantIdentities[t].player.accountId == accId) {
                playerId = curGame.participantIdentities[t].participantId;
                idList.push(playerId);
                champList.push(curGame.participants[t].championId);
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
    returnList.push(allGamesRuneList);
    returnList.push(idList);
    returnList.push(champList);
    //console.log(champList);
    return returnList;
}

function idListToNameList(idList, callback) {
    //console.log(idList);
    var champList = [];
    file = JSON.parse(fs.readFileSync(__dirname + "//champions.json", "utf8"))

    var data = file.data
    for(var i in idList) {
        for(var t in data) {
            //console.log(data[t].id);
            if(idList[i] == data[t].id) {
                //console.log(data[t].name);
                var newName =  data[t].name.replace(/\s/g, '');
                if(newName.includes("'")) {
                    newName = newName.replace("'", "");
                    newName = newName.toLowerCase();
                    newName = newName.charAt(0).toUpperCase() + newName.slice(1);
                }
                if(newName == "Wukong") {
                    newName = "MonkeyKing";
                }
                if(newName == "Kogmaw") {
                    //riot pls. Why is this one inconsistant with the rest of x'y characters?
                    newName = "KogMaw";
                }
                champList.push(newName);
            }
        }
    }
    //console.log(champList);
    callback(champList);
}
