function analysisEngine(riotApi) {
    var riotAPI = require("./../dataGathering/riotAPI");
    this.riot = riotApi;
}
//just pass a name here
analysisEngine.prototype.summonerAnalysis = function(summonerName) {
    //turn summoner name into profile
    
}
analysisEngine.prototype.tests = function() {
    this.riot.nameToProfile("earleking", function(data) {
        console.log(data);
    });
}

module.exports = analysisEngine;