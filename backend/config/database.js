const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('BD-auth-system','hani','123456',{
    host : 'db',
    dialect :'postgres'
});

module.exports = sequelize;