'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Tokens', 'token', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });

    // Supprimez l'ancienne colonne et ajoutez les nouvelles colonnes
    await queryInterface.removeColumn('Tokens', 'token');
    await queryInterface.addColumn('Tokens', 'accessToken', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
    await queryInterface.addColumn('Tokens', 'refreshToken', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Tokens', 'accessToken');
    await queryInterface.removeColumn('Tokens', 'refreshToken');
    await queryInterface.addColumn('Tokens', 'token', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },
};
