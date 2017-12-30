function SQL() {
    this.sql = require('mysql');
    this.connection = this.sql.createConnection({
        host: 'localhost',
        user: 'AFielding',
        password: 'Arek7000',
        database: 'leaguedb'
    });
    this.connection.connect(function(err) {

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

//selects form a table. where arg is in sql syntax
//wherearg is of the form "WHERE x=y"
SQL.prototype.select = function(table, whereArg, callback) {
    var sqlText = "SELECT * FROM " + table + " " + whereArg;
    this.connection.query(sqlText, function(err, result) {
        callback(result);
    });

}

module.exports = SQL;
