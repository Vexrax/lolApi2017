function analysisEngine(riotApi) {
    this.riot = riotApi;
    var mySQL = require("./mySQL");
    this.sql = new mySQL();
    this.runes;
    this.runeTree;
}
analysisEngine.prototype.summonerAnalysis = function(gameList, idList, runeList, callback) {
    //this.sql.select("rune_stats", "WHERE champId=" + gameList[idList]);
    
    
}
analysisEngine.prototype.tests = function() {
    this.riot.nameToProfile("earleking", function(data) {
        console.log(data);
    });
}

analysisEngine.prototype.getGameList = function(game, id, runes, callback) {
    this.sql.select("rune_stats", "WHERE champId=" + game.participants[id - 1].championId, function(data) {
        //find best keystone
        
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