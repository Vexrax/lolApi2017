function SQL() {
    this.sql = require('mysql');
    this.connection = this.sql.createConnection({
        host: 'localhost',
        user: 'AFielding',
        password: 'Arek7000',
        database: 'leaguedb'
    });
    this.connection.connect(function(err) {
        if(err) throw err;
        console.log("Connected to Database");
    });
}
SQL.prototype.insert = function(items) {
    var query = "INSERT INTO items VALUES (";
    for(var i in items - 1) {
        query += items[i] + ","
    }
    query += items[items.length] + ")";
    
}
SQL.prototype.insertNestedArray = function(nestedArray, name) {
    //console.log(nestedArray);
    console.log("Adding record");
    var text = this.connection.query("INSERT INTO " + name + " VALUES ?", [nestedArray], function(err) {
        if (err) {
            console.log("Error encountered");
            console.log(err);
            //throw err;
        }
        else {
            console.log("Record added");
        }
    });
    //console.log("sql: " + text.sql);
}

module.exports = SQL;