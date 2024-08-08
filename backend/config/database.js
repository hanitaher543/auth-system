const { Sequelize } = require("sequelize");

<<<<<<< HEAD
const sequelize = new Sequelize('dbProject-Auth', 'hani', '123456', {
    host: 'localhost',
    dialect: 'postgres'
});

=======
const sequelize = new Sequelize('dbProject-Auth','hani','123456',{
    host : 'localhost',
    dialect :'postgres'
});


>>>>>>> origin/main
module.exports = sequelize;