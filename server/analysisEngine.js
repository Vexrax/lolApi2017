function analysisEngine(riotApi) {
    this.riot = riotApi;
    var mySQL = require("./mySQL");
    this.sql = new mySQL();
    this.runes;
    this.runeTree;
    this.minGames = 50;
}
analysisEngine.prototype.summonerAnalysis = function(gameList, idList, runeList, callback) {
    //this.sql.select("rune_stats", "WHERE champId=" + gameList[idList]);
    var newRuneList = [], pathList = [];
    this.callLoop(gameList, idList, newRuneList, pathList, 0, callback);
    
}
analysisEngine.prototype.callLoop = function(gameList, idList, newRuneList, pathList, index, callback) {
    if(index >= gameList.length) {
        callback(newRuneList, pathList);
    }
    else {
        //console.log(index);
        //console.log(gameList[index]);
        var self = this;
        this.getGameList(gameList[index], idList[index], function(newRList, paths) {
            newRuneList.push(newRList);
            pathList.push(paths);
            self.callLoop(gameList, idList, newRuneList, pathList, index + 1, callback);
        });
    }
}

analysisEngine.prototype.tests = function() {
    this.riot.nameToProfile("earleking", function(data) {
        console.log(data);
    });
}

analysisEngine.prototype.getGameList = function(game, id, callback) {
    var path1, path2;
    var finalRunes = [], paths = [];
    //console.log(game.participants[id - 1].championId);
    var self = this;
    this.sql.select("rune_stats", "WHERE champId=" + game.participants[id - 1].championId, function(data) {
        //find best keystone
        //runeTree[0][1][3]
        //console.log("hello");
        //console.log(data);
        var finalRunes = [];
        var curRune = 0;
        var curTree = 0;//0 precision, 4 inpsiration
        var curWR = -1;
        for(var i in runeTree) {
            //only look through first tier of tree
            for(var z in runeTree[i][0]) {
                for(var row in data) {
                   if(data[row].runeId == runeTree[i][0][z] && data[row].winRate > curWR && data[row].gamesPlayed > 20) {
                       curWR = data[row].winRate;
                       curRune = data[row].runeId;
                       curTree = i;
                   } 
                }
            }
        }
        paths.push(curTree);
        finalRunes.push(curRune);
        var s1, s2, s3;   
        //best keystone should be found at this point
        //now just search for best runes in that tree
        for(var tier in runeTree[curTree]) {
            if(tier == 0) continue;//skip keystone
            curWR = -1;
            s1 = runeTree[curTree][tier][0];
            s2 = runeTree[curTree][tier][1];
            s3 = runeTree[curTree][tier][2];
            
            for(var row in data) {
                if(data[row].gamesPlayed < self.minGames) continue;                
                switch(data[row].runeId) {
                    case s1:
                        if(data[row].winRate > curWR) {
                            curRune = data[row].runeId;
                            curWR = data[row].winRate;
                        }
                        break;
                    case s2:
                        if(data[row].winRate > curWR) {
                            curRune = data[row].runeId;
                            curWR = data[row].winRate;
                        }
                        break;
                    case s3:
                        if(data[row].winRate > curWR) {
                            curRune = data[row].runeId;
                            curWR = data[row].winRate;
                        }
                        break;
                    default:
                        break;
                }
            }
            finalRunes.push(curRune);
            
        }
        var secondTree, runeTier;
        //that does it for primary tree. Now onto secondary tree
        //find best rune in another tree, then find second best rune in that tree
        curWR = -1;        
        for(var i in runeTree) {
            if(i == curTree) continue;//skip primary tree
            for(var tier in runeTree[i]) {
                if(tier == 0) continue;//skip keystones
                s1 = runeTree[i][tier][0];//get the 3 runes
                s2 = runeTree[i][tier][1];
                s3 = runeTree[i][tier][2];

                for(var row in data) {
                    if(data[row].gamesPlayed < self.minGames) continue;                    
                    switch(data[row].runeId) {
                        case s1:
                            if(data[row].winRate > curWR) {
                                curRune = data[row].runeId;
                                curWR = data[row].winRate;
                                secondTree = i;//update second tree var
                                runeTier = tier;//store tier of this rune
                            }
                            break;
                        case s2:
                            if(data[row].winRate > curWR) {
                                curRune = data[row].runeId;
                                curWR = data[row].winRate;
                                secondTree = i;
                                runeTier = tier;
                            }
                            break;
                        case s3:
                            if(data[row].winRate > curWR) {
                                curRune = data[row].runeId;
                                curWR = data[row].winRate;
                                secondTree = i;
                                runeTier = tier;
                            }
                            break;
                        default:
                            break;
                    }
                }
            }
        }
        //now we have best rune in tree out of primary tree
        paths.push(secondTree);
        finalRunes.push(curRune);
        curWR = -1;
        //now look for second best rune in that path
        for(var tier in runeTree[secondTree]) {
            if(tier == 0) continue;//skip keystones
            if(tier == runeTier) continue //skip tier of already gotten rune
            s1 = runeTree[secondTree][tier][0];//get the 3 runes
            s2 = runeTree[secondTree][tier][1];
            s3 = runeTree[secondTree][tier][2];
            for(var row in data) {
                if(data[row].gamesPlayed < self.minGames) continue;
                switch(data[row].runeId) {
                    case s1:
                        if(data[row].winRate > curWR) {
                            curRune = data[row].runeId;
                            curWR = data[row].winRate;
                        }
                        break;
                    case s2:
                        if(data[row].winRate > curWR) {
                            curRune = data[row].runeId;
                            curWR = data[row].winRate;
                        }
                        break;
                    case s3:
                        if(data[row].winRate > curWR) {
                            curRune = data[row].runeId;
                            curWR = data[row].winRate;
                        }
                        break;
                    default:
                        break;
                }
            }
        }
        finalRunes.push(curRune);
        callback(finalRunes, paths);
    });
}

analysisEngine.prototype.setUp = function() {
    this.sql.select("runes", "", function(data) {
        this.runes = data;
        //this creates the required 3 array. stuff below this puts in proper runes
        this.runeTree = [ [ [ 9111, 9105, 9103 ],
        [ 9111, 9105, 9103 ],
        [ 9111, 9105, 9103 ],
        [ 9111, 9105, 9103 ] ],
      [ [ 9111, 9105, 9103 ],
        [ 9111, 9105, 9103 ],
        [ 9111, 9105, 9103 ],
        [ 9111, 9105, 9103 ] ],
      [ [ 9111, 9105, 9103 ],
        [ 9111, 9105, 9103 ],
        [ 9111, 9105, 9103 ],
        [ 9111, 9105, 9103 ] ],
      [ [ 9111, 9105, 9103 ],
        [ 9111, 9105, 9103 ],
        [ 9111, 9105, 9103 ],
        [ 9111, 9105, 9103 ] ],
      [ [ 9111, 9105, 9103 ],
        [ 9111, 9105, 9103 ],
        [ 9111, 9105, 9103 ],
        [ 9111, 9105, 9103 ] ] ];
        for(var i in this.runes) {
            //getKeyStones
            //console.log(this.runes[i]);
            if(this.runes[i].locationId > 1000) continue;
            var tree = String(this.runes[i].locationId).charAt(0);
            var tier = String(this.runes[i].locationId).charAt(1);
            var slot = String(this.runes[i].locationId).charAt(2);
            //console.log(tree + " " + tier + " " + slot);
            this.runeTree[tree - 1][tier - 1][slot - 1] = this.runes[i].id
        }
        //console.log(runeTree);
    });
}
module.exports = analysisEngine;