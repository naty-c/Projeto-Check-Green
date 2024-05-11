'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('places', [
      {
        user_id: '37',
        name: 'Trilha da Lagoinha do Leste',
        description: 'Lagoinha do Leste é uma das trilhas mais procuradas de Florianópolis...',
        location: 'Lagoinha do Leste',
        longitude: '-48.4972123',
        latitude: '-27.778718',
        accessibility: 'Partially Accessible',
        category: 'Trilha',
        rating: '5',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: '37',
        name: 'Trilha Praia de Naufragados',
        description: 'Praia de Naufragados é uma das praias mais reservadas de Florianópolis...',
        location: 'Praia de Naufragados',
        longitude: '-48.5875607',
        latitude: '-27.8315255',
        accessibility: 'Partially Accessible',
        category: 'Trilha',
        rating: '4',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: '43',
        name: 'Ilha do Campeche',
        description: 'Ilha do Campeche é uma das ilhas mais populares de Florianópolis...',
        location: 'Praia do Campeche',
        longitude: '-48.46564074347052',
        latitude: '-27.697862399999998',
        accessibility: 'Accessible',
        category: 'Praia',
        rating: '3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: '38',
        name: 'Lagoa do Peri',
        description: 'Lagoa do Peri é um dos principais parques de Florianópolis...',
        location: 'Parque Municipal da Lagoa do Peri',
        longitude: '-48.5075253',
        latitude: '-27.726159',
        accessibility: 'Accessible',
        category: 'Parque',
        rating: '5',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: '38',
        name: 'Dunas da Praia da Joaquina',
        description: 'Praia da Joaquina é uma dos praias mais badaladas de Florianópolis...',
        location: 'Praia da Joaquina',
        longitude: '-48.45429512946963',
        latitude: '-27.6343625',
        accessibility: 'Accessible',
        category: 'Praia',
        rating: '5',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('places', null, {});
  },
};
