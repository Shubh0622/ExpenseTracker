const Sequelize = require('sequelize');

const sequelize = new Sequelize('expense', 'root', 'Akshubham8@', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize;