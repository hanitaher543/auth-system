'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Tokens', 'accessToken');
    await queryInterface.removeColumn('Tokens', 'refreshToken');

    await queryInterface.addColumn('Tokens', 'token', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn('Tokens', 'state', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Tokens', 'token');
    await queryInterface.removeColumn('Tokens', 'state');

    await queryInterface.addColumn('Tokens', 'accessToken', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn('Tokens', 'refreshToken', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  }
};
