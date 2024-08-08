const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const User = sequelize.define('User', {

    id :{
        type: DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true,
    },
    fullName :{
        type: DataTypes.STRING,
        allowNull : false,
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false,
        unique: true,
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    phoneNumber: { // New column for phone number
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = User;