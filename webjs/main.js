var socket = io();
//console.log("data emitted");
//socket.emit("getMatchHistory", "");
//var document = require('html-element').document;

socket.on("matchHistory", function(summonerData, gamesList, currentRunesList, advisedRunesList) {
    console.log(summonerData);
    console.log(gamesList);
    console.log(currentRunesList);
    document.getElementById("nameplate").innerHTML = summonerData.name;
    
});

socket.on("modifyHTML", function(data){
    console.log("changing HTML");
    document.getElementById("nameplate").innerHTML = data;
});
