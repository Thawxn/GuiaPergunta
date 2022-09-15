const sequelize = require("sequelize");

const connection = new sequelize('guiaperguntas', 'root', '40028922Th.', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;

