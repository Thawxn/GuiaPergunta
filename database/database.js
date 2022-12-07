const sequelize = require("sequelize");

const connection = new sequelize('guiaperguntas', 'root', '2001', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;

