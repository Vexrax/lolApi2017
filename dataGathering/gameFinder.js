//requires riot API key, the number of games to find, and a summoner name to start the search
function finder(key, gamesToFind, initalName) {
    this.apiKey = key;
    this.numberToFind = gamesToFind;
    riotJS = require('./riotAPI');
    sqlJS = require('./mySQL');
    this.riot = new riotJS(this.apiKey);
    this.sql = new sqlJS();
    this.starter(initalName)
}

finder.prototype.getGamesForSummoner = function(accID) {
    var self = this;
    this.riot.getGameList(accID, function(games) {
        var toSQL;;
        for(i in games) {
            toSQL = createSQLArray(games[i]);
            self.sql.insert(toSQL);
        }
    });
}

finder.prototype.starter = function(initalName) {
    var self = this;
    this.riot.nameToAccountID(initalName, function(accId) {
        self.getGamesForSummoner(accId);
    });
}

function createSQLArray(body) {
    var players = body.participants;
    var arr = [];
    var bigarr = [];
    //uh yeah, rip
    var player;
    for(i in players) {
        player = players[i];
        arr.push(body.gameId + player.participantId);
        arr.push(body.gameId);
        arr.push(player.stats.win == "true" ? 1 : 0);
        arr.push(player.timeline.lane);
        arr.push(player.timeline.role);
        arr.push(player.stats.kills);
        arr.push(player.stats.deaths);
        arr.push(player.stats.assists);
        arr.push(player.stats.item0);
        arr.push(player.stats.item1);
        arr.push(player.stats.item2);
        arr.push(player.stats.item3);
        arr.push(player.stats.item4);
        arr.push(player.stats.item5);
        arr.push(player.stats.item6);
        arr.push(player.stats.visionScore);
        arr.push(player.championId);
        arr.push(player.spell1Id);
        arr.push(player.spell2Id);
        arr.push(player.stats.totalMinionsKilled);
        arr.push(player.stats.neutralMinionsKilledTeamJungle);
        arr.push(player.stats.neutralMinionsKilledEnemyJungle);
        arr.push(player.stats.neutralMinionsKilled);
        arr.push(body.gameDuration);
        arr.push(player.timeline.goldPerMinDeltas["0-10"]);
        arr.push(player.timeline.creepsPerMinDeltas["0-10"]);
        arr.push(player.stats.physicalDamageDealtToChampions);
        arr.push(player.stats.magicDamageDealtToChampions);
        arr.push(player.stats.physicalDamageTaken);
        arr.push(player.stats.magicalDamageTaken);
        arr.push(player.stats.damageDealtToObjectives);
        arr.push(player.stats.wardsPlaced);
        arr.push(player.stats.wardsKilled);
        arr.push(player.stats.visionWardsBoughtInGame);
        arr.push(player.stats.totalHeal);
        arr.push(player.stats.perk0);
        arr.push(player.stats.perk1);
        arr.push(player.stats.perk2);
        arr.push(player.stats.perk3);
        arr.push(player.stats.perk4);
        arr.push(player.stats.perk5);
        arr.push(player.stats.perk0Var1);
        arr.push(player.stats.perk0Var2);
        arr.push(player.stats.perk0Var3);
        arr.push(player.stats.perk1Var1);
        arr.push(player.stats.perk1Var2);
        arr.push(player.stats.perk1Var3);
        arr.push(player.stats.perk2Var1);
        arr.push(player.stats.perk2Var2);
        arr.push(player.stats.perk2Var3);
        arr.push(player.stats.perk3Var1);
        arr.push(player.stats.perk3Var2);
        arr.push(player.stats.perk3Var3);
        arr.push(player.stats.perk4Var1);
        arr.push(player.stats.perk4Var2);
        arr.push(player.stats.perk4Var3);
        arr.push(player.stats.perk5Var1);
        arr.push(player.stats.perk5Var2);
        arr.push(player.stats.perk5Var3);
        bigarr.push(arr);
        arr = [];   
    }
    
}
module.exports = finder;