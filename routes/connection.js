module.exports = {
    connection: function () {
        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'shopping',
            password: 'shopping'
        });

        connection.connect();
        return connection;
    }
};
