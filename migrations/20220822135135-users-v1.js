'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Users', 'username', {
          type: Sequelize.DataTypes.STRING,
          unique: true
        }, { transaction: t }),
        queryInterface.addColumn('Users', 'restaurant_id', {
          type: Sequelize.DataTypes.STRING,
        }, { transaction: t }),
      ])
    })

  },

  down: (queryInterface, Sequelize) => {

  }
};
