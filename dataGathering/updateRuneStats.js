var mySQL = require('./mySQL');
var sql = new mySQL();

function main() {
    getRuneList(function(runeList) {
        getChampionList(function(champList) {
            champLoop(runeList, champList, 0);
        });
    });
}

function getRuneList(callback) {
    sql.select("runes", "", function(data) {
        callback(data);
    });
}

function getChampionList(callback) {
    sql.select("champions", "", function(data) {
        callback(data);
    });
}

//async loop to go thorugh all champs
//index is which champ we are on
function champLoop(runeList, champList, index) {
    //create rune array, this is where a single champs rune data will be stored before being passed to db
    var runeArray = [];
    var pushArray = [];//uh need this cuz Im passing by value.
    for(var i in runeList) {
        //console.log(i);
        var rune = []; //this is a single rune
        rune.push(runeList[i].id + "" + champList[index].id);
        rune.push(runeList[i].id);
        rune.push(champList[index].id);
        rune.push(0);//win %
        rune.push(0);//games
        rune.push(0);//var1
        rune.push(0);//var2
        rune.push(0);//var3   
        runeArray.push(rune);
        rune = [];
    }
    sql.select("games_ps8", "WHERE champ=" + champList[index].id, function(data) {
        for(var gamesLoop in data) {
            var cur = data[gamesLoop];
            for(var runesLoop in runeArray) {
                //console.log(runesLoop);
                if(runeArray[runesLoop][1] == cur.perk1) {
                    runeArray[runesLoop][3] += cur.win;
                    runeArray[runesLoop][4] ++;
                    runeArray[runesLoop][5] += cur.perk1var1;
                    runeArray[runesLoop][6] += cur.perk1var2;
                    runeArray[runesLoop][7] += cur.perk1var3;
                }
                else if(runeArray[runesLoop][1] == cur.perk2) {
                    runeArray[runesLoop][3] += cur.win;
                    runeArray[runesLoop][4] ++;
                    runeArray[runesLoop][5] += cur.perk2var1;
                    runeArray[runesLoop][6] += cur.perk2var2;
                    runeArray[runesLoop][7] += cur.perk2var3;
                }
                else if(runeArray[runesLoop][1] == cur.perk3) {
                    runeArray[runesLoop][3] += cur.win;
                    runeArray[runesLoop][4] ++;
                    runeArray[runesLoop][5] += cur.perk3var1;
                    runeArray[runesLoop][6] += cur.perk3var2;
                    runeArray[runesLoop][7] += cur.perk3var3;
                }
                else if(runeArray[runesLoop][1] == cur.perk4) {
                    runeArray[runesLoop][3] += cur.win;
                    runeArray[runesLoop][4] ++;
                    runeArray[runesLoop][5] += cur.perk4var1;
                    runeArray[runesLoop][6] += cur.perk4var2;
                    runeArray[runesLoop][7] += cur.perk4var3;
                }
                else if(runeArray[runesLoop][1] == cur.perk5) {
                    runeArray[runesLoop][3] += cur.win;
                    runeArray[runesLoop][4] ++;
                    runeArray[runesLoop][5] += cur.perk5var1;
                    runeArray[runesLoop][6] += cur.perk5var2;
                    runeArray[runesLoop][7] += cur.perk5var3;
                }
                else if(runeArray[runesLoop][1] == cur.perk6) {
                    runeArray[runesLoop][3] += cur.win;
                    runeArray[runesLoop][4] ++;
                    runeArray[runesLoop][5] += cur.perk6var1;
                    runeArray[runesLoop][6] += cur.perk6var2;
                    runeArray[runesLoop][7] += cur.perk6var3;
                }
            }
        }
        for(var runeIndex in runeArray) {
            if(runeArray[runeIndex][4] == 0) continue;
            runeArray[runeIndex][5] /= runeArray[runeIndex][4];
            runeArray[runeIndex][6] /= runeArray[runeIndex][4];
            runeArray[runeIndex][7] /= runeArray[runeIndex][4];
        }
        sql.insertNestedArray(runeArray, "rune_stats");
        if(index < champList.length - 1) champLoop(runeList, champList, index + 1);
    });
}

main();