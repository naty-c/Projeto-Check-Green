'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'places',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING
        },
        description: {
          allowNull: false,
          type: Sequelize.STRING
        },
        location: {
          allowNull: false,
          type: Sequelize.STRING
        },
        latitude: {
          allowNull: false,
          type: Sequelize.DECIMAL
        },
        longitude: {
          allowNull: false,
          type: Sequelize.DECIMAL 
        },
        accessibility: {
          allowNull: false,
          type: Sequelize.STRING
        },
        category: {
          allowNull: false,
          type: Sequelize.STRING
        },
        rating: {
          allowNull: false,
          type: Sequelize.STRING
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });

      queryInterface.addColumn('places', 'user_id', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    });
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('places');
  }
};
