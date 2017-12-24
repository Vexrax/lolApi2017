function SQL() {
    this.sql = require('mysql');
    this.connection = this.sql.createConnection({
        host: 'localhost',
        user: 'AFielding',
        password: 'Arek7000',
        database: 'leaguedb'
    });
    this.connection.connect(function(err) {
        throw err;
    });
}
SQL.prototype.insert = function(items) {
    var query = "INSERT INTO items VALUES (";
    for(var i in items - 1) {
        query += items[i] + ","
    }
    query += items[items.length] + ")";
    
}

module.exports = SQL;