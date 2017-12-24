
function riot(key) {
    this.request = require('request');
    this.key = key;
    this.host = "https://na1.api.riotgames.com"
    //patchTime is the ms epoch time of the most recent patch. This just gets only current patch data
    this.patchTime = 1512709200000;
    this.keyString = "?api_key=" + this.key;
}
//callback should accept 1 arg, an int for the id
riot.prototype.nameToSummonerID = function(name, callback) {
    var uri = this.host + "/lol/summoner/v3/summoners/by-name/" + name + this.keyString;
    this.request(uri, function(err, res, body) {
        if(err) {
            throw err;
        }
        var json = JSON.parse(body);
        callback(json.id);
    });
}
//callback should accept 1 arg, an int for the id
riot.prototype.nameToAccountID = function(name, callback) {
    var uri = this.host + "/lol/summoner/v3/summoners/by-name/" + name + this.keyString;
    this.request(uri, function(err, res, body) {
        if(err) {
            throw err;
        }
        var json = JSON.parse(body);
        callback(json.accountId);
    });
}

//requires accountID
//returns an array of the games
riot.prototype.getGameList = function(accountID, callback) {
    var uri = this.host + "/lol/match/v3/matchlists/by-account/" + accountID + "?queue=420&beginTime=" + this.patchTime + "&api_key=" + this.key;
    this.request(uri, function(err, res, body) {
        if(err) throw err;
        var json = JSON.parse(body);
        if(json.status_code != undefined) {
            throw json.status_code + ": " + json.message;
        }
        var games = new Array(json.endIndex);
        for(var i in games) {
            games[i] = json.matches[i];
        }
        callback(games);
    });
}

module.exports = riot;