'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Token, {
        foreignKey: 'userId',
        as: 'token',
      });
    }
  }
  User.init(
    {
      fullname: DataTypes.STRING,
      allowNull: false, 
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false, 
      },
      password: DataTypes.STRING,
      allowNull: false, 
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

