var mySQL = require('./mySQL');
var fs = require('fs');
var sql = new mySQL();

var obj = JSON.parse(fs.readFileSync(__dirname + "/runesReforged.json", "utf8"));

var runes = [];
var rune = [];
for(var i in obj) {
    rune.push(obj[i].id);
    rune.push(obj[i].name);
    rune.push(obj[i].shortDesc);
    rune.push(obj[i].longDesc);
    runes.push(rune);
    rune = [];
}
sql.insertNestedArray(runes, "runes");
