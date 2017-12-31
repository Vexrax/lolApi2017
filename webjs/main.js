var socket = io();
//console.log("data emitted");
//socket.emit("getMatchHistory", "");
//var document = require('html-element').document;
//global variables
var currentRunesListG, currentRuneTreesG, advisedRunesListG, advisedRuneTreesG, runeTreeG;
//
socket.emit("getMatchHistory");
socket.on("matchHistory", function(summonerData, gamesList, idList, currentRunesList, currentRuneTrees, advisedRunesList, advisedRuneTrees, champList, runeTree) {
    /*document.getElementById("playerscontent0").style.visibility = 'visible';
    document.getElementById("playerscontent1").style.visibility = 'visible';
    document.getElementById("playerscontent2").style.visibility = 'visible';
    document.getElementById("playerscontent3").style.visibility = 'visible';
    document.getElementById("playerscontent4").style.visibility = 'visible';
    document.getElementById("playerscontent5").style.visibility = 'visible';
    document.getElementById("playerscontent6").style.visibility = 'visible';
    document.getElementById("playerscontent7").style.visibility = 'visible';*/
    for(var i = 0; i < 8; i ++) {
        document.getElementById("KDAcontent" + i + "-1").style.visibility = 'visible';
        document.getElementById("button" + i).style.visibility = 'visible';
        document.getElementById("playerscontent" + i).style.visibility = 'visible';
    }

    //assign to globals
    currentRunesListG = currentRunesList;
    currentRuneTreesG = currentRuneTrees;
    advisedRunesListG = advisedRunesList;
    advisedRuneTreesG = advisedRuneTrees;
    runeTreeG = runeTree;
    console.log(summonerData);
    console.log(gamesList);
    console.log(idList);
    console.log(currentRunesList);
    console.log(currentRuneTrees);
    console.log(advisedRunesList);
    console.log(advisedRuneTrees);
    console.log(champList);
    console.log(gamesList[0].participants[idList[0] - 1].spell1Id);
    document.getElementById("nameplate").innerHTML = summonerData.name;
    for(var i  in champList)
    {
        var id = "champcontent" + i + "-2";
        //console.log(id);
        if(i > 7)
        {
            break;
        }
        document.getElementById(id).src = "http://ddragon.leagueoflegends.com/cdn/7.24.2/img/champion/" + champList[i] + ".png";
        id = "matchcontent" + i;
        document.getElementById(id).style.backgroundImage = "url('http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + champList[i] + "_0.jpg')";
        //console.log(id);
    }
    for(var j in gamesList)
    {
        if(j > 7)
        {
            break;
        }
        var sumID ="";
        var sumswitch = gamesList[j].participants[idList[j] - 1].spell1Id;
        //console.log(sumswitch);
        switch(sumswitch)
        {
            case 1:
                sumID = "http://ddragon.leagueoflegends.com/cdn/7.24.2/img/spell/SummonerBoost.png";
                break;
            case 3:
                sumID = "http://ddragon.leagueoflegends.com/cdn/7.24.2/img/spell/SummonerExhaust.png";
                break;
            case 4:
                sumID = "http://ddragon.leagueoflegends.com/cdn/7.24.2/img/spell/SummonerFlash.png";
                break;
            case 7:
                sumID = "http://ddragon.leagueoflegends.com/cdn/7.24.2/img/spell/SummonerHeal.png";
                break;
            case 11:
                sumID = "http://ddragon.leagueoflegends.com/cdn/7.24.2/img/spell/SummonerSmite.png";
                break;
            case 12:
                sumID = "http://ddragon.leagueoflegends.com/cdn/7.24.2/img/spell/SummonerTeleport.png";
                break;
            case 14:
                sumID = "http://ddragon.leagueoflegends.com/cdn/7.24.2/img/spell/SummonerDot.png";
                break;
            case 21:
                sumID = "http://ddragon.leagueoflegends.com/cdn/7.24.2/img/spell/SummonerBarrier.png";
                break;
            case 30:
                sumID = "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/SummonerPoroRecall.png";
                break;
            case 31:
                sumID = "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/SummonerPoroThrow.png";
                break;
            case 32:
                sumID = "http://ddragon.leagueoflegends.com/cdn/7.24.2/img/spell/SummonerSnowball.png";
                break;
            case 39:
                sumID = "http://ddragon.leagueoflegends.com/cdn/7.24.2/img/spell/SummonerSnowball.png";
                break;
            default:
                sumID = "http://ddragon.leagueoflegends.com/cdn/7.24.2/img/spell/SummonerFlash.png";
                break;
        }
        id = "champcontent" + j +"-4";
        console.log("id:" + id);
        document.getElementById(id).src = sumID;
    }
    for(var k in gamesList)
    {
        if(k > 7)
        {
            break;
        }
        sumID ="";
        sumswitch = gamesList[k].participants[idList[k] - 1].spell2Id;
        switch(sumswitch)
        {
            case 1:
                sumID = "http://ddragon.leagueoflegends.com/cdn/7.24.2/img/spell/SummonerBoost.png";
                break;
            case 3:
                sumID = "http://ddragon.leagueoflegends.com/cdn/7.24.2/img/spell/SummonerExhaust.png";
                break;
            case 4:
                sumID = "http://ddragon.leagueoflegends.com/cdn/7.24.2/img/spell/SummonerFlash.png";
                break;
            case 7:
                sumID = "http://ddragon.leagueoflegends.com/cdn/7.24.2/img/spell/SummonerHeal.png";
                break;
            case 11:
                sumID = "http://ddragon.leagueoflegends.com/cdn/7.24.2/img/spell/SummonerSmite.png";
                break;
            case 12:
                sumID = "http://ddragon.leagueoflegends.com/cdn/7.24.2/img/spell/SummonerTeleport.png";
                break;
            case 13:
                sumID = "http://ddragon.leagueoflegends.com/cdn/7.24.2/img/spell/SummonerMana.png";
                break;
            case 14:
                sumID = "http://ddragon.leagueoflegends.com/cdn/7.24.2/img/spell/SummonerDot.png";
                break;
            case 21:
                sumID = "http://ddragon.leagueoflegends.com/cdn/7.24.2/img/spell/SummonerBarrier.png";
                break;
            case 30:
                sumID = "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/SummonerPoroRecall.png";
                break;
            case 31:
                sumID = "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/SummonerPoroThrow.png";
                break;
            case 32:
                sumID = "http://ddragon.leagueoflegends.com/cdn/7.24.2/img/spell/SummonerSnowball.png";
                break;
            case 39:
                sumID = "http://ddragon.leagueoflegends.com/cdn/7.24.2/img/spell/SummonerSnowball.png";
                break;
            default:
                sumID = "http://ddragon.leagueoflegends.com/cdn/7.24.2/img/spell/SummonerFlash.png";
                break;
        }
        id = "champcontent" + k +"-3";
        //console.log("id:" + id);
        document.getElementById(id).src = sumID;
    }
    for(var m in gamesList)
    {
        if(m > 7)
        {
            break;
        }
        if(!gamesList[m].participants[idList[m] - 1].stats.item0 == 0)
            document.getElementById("itemscontent" + m  + "-1").src = "http://ddragon.leagueoflegends.com/cdn/7.24.2/img/item/" + gamesList[m].participants[idList[m] - 1].stats.item0 +".png";
        if(!gamesList[m].participants[idList[m] - 1].stats.item1 == 0)
            document.getElementById("itemscontent" + m  + "-2").src = "http://ddragon.leagueoflegends.com/cdn/7.24.2/img/item/" + gamesList[m].participants[idList[m] - 1].stats.item1 +".png";
        if(!gamesList[m].participants[idList[m] - 1].stats.item2 == 0)
            document.getElementById("itemscontent" + m  + "-3").src = "http://ddragon.leagueoflegends.com/cdn/7.24.2/img/item/" + gamesList[m].participants[idList[m] - 1].stats.item2 +".png";
        if(!gamesList[m].participants[idList[m] - 1].stats.item6 == 0)
            document.getElementById("itemscontent" + m  + "-4").src = "http://ddragon.leagueoflegends.com/cdn/7.24.2/img/item/" + gamesList[m].participants[idList[m] - 1].stats.item6 +".png"; //this element is trinket slot
        if(!gamesList[m].participants[idList[m] - 1].stats.item3 == 0)
            document.getElementById("itemscontent" + m  + "-5").src = "http://ddragon.leagueoflegends.com/cdn/7.24.2/img/item/" + gamesList[m].participants[idList[m] - 1].stats.item3 +".png";
        if(!gamesList[m].participants[idList[m] - 1].stats.item4 == 0)
            document.getElementById("itemscontent" + m  + "-6").src = "http://ddragon.leagueoflegends.com/cdn/7.24.2/img/item/" + gamesList[m].participants[idList[m] - 1].stats.item4 +".png";
        if(!gamesList[m].participants[idList[m] - 1].stats.item5 == 0)
            document.getElementById("itemscontent" + m  + "-7").src = "http://ddragon.leagueoflegends.com/cdn/7.24.2/img/item/" + gamesList[m].participants[idList[m] - 1].stats.item5 +".png";
        //console.log(gamesList[m].participants[idList[m] - 1].stats.item6 +".png")
    }
    for(var z in gamesList)
    {
        // this currently returns undefined everything
        if(z > 7) break;
        document.getElementById("KDAcontent" + z + "-1").innerHTML = gamesList[z].participants[idList[z] - 1].stats.kills  + " | " + gamesList[z].participants[idList[z] - 1].stats.deaths  + " | " + gamesList[z].participants[idList[z] - 1].stats.assists;
    }

    //now change the player names
    for(var i in gamesList) {
        if(i > 7) break;
        for(var player in gamesList[i].participants) {
            var changeId
            if(player < 5)
                changeId= "playerscontent" + i + "-1-" + ((player % 5) + 1);
            else
                changeId= "playerscontent" + i + "-2-" + ((player % 5) + 1);
            //console.log(changeId);
            document.getElementById(changeId).innerHTML = gamesList[i].participantIdentities[player].player.summonerName;
        }
    }

    //set runes
    for(var l in gamesList) {
        if(l > 7) break;
        console.log(l);
        //set keystone
        var primaryTree = currentRuneTrees[l][0];
        var secondaryTree = currentRuneTrees[l][1];
        //set tree icons for current tree
        var id = "matchrunekeystone" + l + "-0";
        //console.log(pathIdToPicId(primaryTree));
        document.getElementById(id).src = "/Icons/Runes/" + pathIdToPicId(primaryTree) + ".png";
        id = "matchSecondary" + l + "-0";
        document.getElementById(id).src = "/Icons/Runes/" + pathIdToPicId(secondaryTree) + ".png";

        //set primary tree runes
        for(var keyIndex = 1; keyIndex <= 12; keyIndex ++) {
            for(var i in currentRunesList[l]) {
                var curRune = runeTree[primaryTree][Math.floor((keyIndex - 1) / 3)][((keyIndex - 1) % 3)];
                if(currentRunesList[l][i] == curRune) {
                    document.getElementById("matchrunekeystone" + l + "-" + keyIndex).src = "/Icons/Runes/" + curRune + ".png";
                    break;
                }
                if(i == currentRunesList[l].length - 1){
                    document.getElementById("matchrunekeystone" + l + "-" + keyIndex).src = "/Icons/Runes/" + curRune + "-1.png";

                }
            }
        }
        //set secondary tree runes
        for(var keyIndex = 1; keyIndex <= 9; keyIndex ++) {
            for(var i in currentRunesList[l]) {
                var curRune = runeTree[secondaryTree][Math.floor((keyIndex - 1) / 3) + 1][((keyIndex - 1) % 3)];
                if(currentRunesList[l][i] == curRune) {
                    document.getElementById("matchSecondary" + l + "-" + keyIndex).src = "/Icons/Runes/" + curRune + ".png";
                    break;
                }
                if(i == currentRunesList[l].length - 1){
                    document.getElementById("matchSecondary" + l + "-" + keyIndex).src = "/Icons/Runes/" + curRune + "-1.png";

                }
            }
        }
        var go = true;
        //check for dups
        for(var i = 0; i < advisedRunesList[l].length - 1; i ++) {
            if(advisedRunesList[l][i] == advisedRunesList[l][i + 1]) {
                //rune was equal, not enough data
                go = false;
            }
        }
        primaryTree = advisedRuneTrees[l][0];
        secondaryTree = advisedRuneTrees[l][1];
        id = "suggestedkeystone" + l + "-0";
        document.getElementById(id).src = "/Icons/Runes/" + pathIdToPicId(primaryTree) + ".png";
        id = "suggestedSecondary" + l + "-0";
        document.getElementById(id).src = "/Icons/Runes/" + pathIdToPicId(secondaryTree) + ".png";
        //set primary tree runes
        for(var keyIndex = 1; keyIndex <= 12; keyIndex ++) {
            for(var i in advisedRunesList[l]) {
                var curRune = runeTree[primaryTree][Math.floor((keyIndex - 1) / 3)][((keyIndex - 1) % 3)];
                if(advisedRunesList[l][i] == curRune && go) {
                    document.getElementById("suggestedkeystone" + l + "-" + keyIndex).src = "/Icons/Runes/" + curRune + ".png";
                    break;
                }
                if(i == advisedRunesList[l].length - 1){
                    document.getElementById("suggestedkeystone" + l + "-" + keyIndex).src = "/Icons/Runes/" + curRune + "-1.png";
                }
            }
        }
        //set secondary tree runes
        for(var keyIndex = 1; keyIndex <= 9; keyIndex ++) {
            for(var i in advisedRunesList[l]) {
                var curRune = runeTree[secondaryTree][Math.floor((keyIndex - 1) / 3) + 1][((keyIndex - 1) % 3)];
                if(advisedRunesList[l][i] == curRune && go) {
                    document.getElementById("suggestedSecondary" + l + "-" + keyIndex).src = "/Icons/Runes/" + curRune + ".png";
                    break;
                }
                if(i == advisedRunesList[l].length - 1){
                    document.getElementById("suggestedSecondary" + l + "-" + keyIndex).src = "/Icons/Runes/" + curRune + "-1.png";

                }
            }
        }
    }
});

socket.on("modifyHTML", function(data){
    console.log("changing HTML");
    document.getElementById("nameplate").innerHTML = data;
    document.getElementById("playerscontent0").style.visibility = 'hidden';
    document.getElementById("playerscontent1").style.visibility = 'hidden';
    document.getElementById("playerscontent2").style.visibility = 'hidden';
    document.getElementById("playerscontent3").style.visibility = 'hidden';
    document.getElementById("playerscontent4").style.visibility = 'hidden';
    document.getElementById("playerscontent5").style.visibility = 'hidden';
    document.getElementById("playerscontent6").style.visibility = 'hidden';
    document.getElementById("playerscontent7").style.visibility = 'hidden';

});

socket.on("noSummFound", function() {
    console.log("No summoner found");
});

function myFunction(id) {
    console.log(id);
    var gameNum = id.substring(6, 7);
    if(document.getElementById("runesspace" + gameNum).style.display != "inline-block") {
        document.getElementById("runesspace" + gameNum).style.display = "inline-block";
        document.getElementById("runesspace" + gameNum).style.visibility = 'visible';
        document.getElementById(id).style.backgroundImage = "/Icons/up-arrow.png";
    }
    else {
        document.getElementById("runesspace" + gameNum).style.display = "none";
        document.getElementById("runesspace" + gameNum).style.visibility = 'hidden';
        document.getElementById(id).style.backgroundImage = "/Icons/down-arrow.png";

    }
}

function pathIdToPicId(pathId) {
    if(pathId == 0)
        return 8000;
    else if(pathId == 1)
        return 8100;
    else if(pathId == 2)
        return 8200;
    else if(pathId == 3)
        return 8400;
    else if(pathId == 4)
        return 8300;
    return 0;
}
