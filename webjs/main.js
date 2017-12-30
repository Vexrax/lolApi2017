var socket = io();
//console.log("data emitted");
//socket.emit("getMatchHistory", "");
//var document = require('html-element').document;
socket.emit("getMatchHistory");
socket.on("matchHistory", function(summonerData, gamesList, idList, currentRunesList, advisedRunesList, champList) {
    console.log(summonerData);
    console.log(gamesList);
    console.log(idList);
    console.log(currentRunesList);
    console.log(champList);
    document.getElementById("nameplate").innerHTML = summonerData.name;
    
});

socket.on("modifyHTML", function(data){
    console.log("changing HTML");
    document.getElementById("nameplate").innerHTML = data;
});

socket.on("noSummFound", function() {
    console.log("No summoner found");
});