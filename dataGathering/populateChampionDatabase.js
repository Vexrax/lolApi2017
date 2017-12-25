//this is literally just for populating champion database

var mySQL = require("./mySQL");
var riotAPI = require("./riotAPI");
var riot = new riotAPI("");
var sql = new mySQL();
riot.getChampData(function(championArray) {
    sql.insertNestedArray(championArray, "champions");
});

