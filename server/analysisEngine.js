function analysisEngine(riotApi) {
    this.riot = riotApi;
    var mySQL = require("./mySQL");
    this.sql = new mySQL();
}
analysisEngine.prototype.summonerAnalysis = function(gameList, idList, runeList, callback) {
    this.sql.select("rune_stats", "WHERE champId=" + )
}
analysisEngine.prototype.tests = function() {
    this.riot.nameToProfile("earleking", function(data) {
        console.log(data);
    });
}

analysisEngine.prototype.getGameList = function(game, id, runes, callback) {
    this.sql.select("rune_stats", "WHERE champId=" + game.participants[id - 1].championId, function(data) {
        
    });
}

module.exports = analysisEngine;