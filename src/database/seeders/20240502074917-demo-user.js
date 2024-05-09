'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPasswords = await Promise.all([
      bcrypt.hash('@Ltr1asaB3r', 8),
      bcrypt.hash('@3Miy@rch3r', 8),
      bcrypt.hash('@rJUna@Lt3r', 8),
      bcrypt.hash('@0zymaNdias', 8),
      bcrypt.hash('K@M@isH3r3', 8)
    ]);

    return queryInterface.bulkInsert('users', [

      {
        name: 'Altria',
        email: 'altria@email.com',
        password: hashedPasswords[0],
        gender: 'Female',
        birthday: '2001-01-01',
        CPF: '12345678900',
        address: 'Street 01, 01 - FGO',
        phone: '4811111111',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Emiya',
        email: 'emiya@email.com',
        password: hashedPasswords[1],
        gender: 'Male',
        birthday: '2002-02-02',
        CPF: '22222222222',
        address: 'Street 02, 02 - FGO',
        phone: '4822222222',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Arjuna',
        email: 'arjuna@email.com',
        password: hashedPasswords[2],
        gender: 'Other',
        birthday: '2003-03-03',
        CPF: '33333333333',
        address: 'Street 03, 03 - FGO',
        phone: '04833333333',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ozymandias',
        email: 'ozymandias@email.com',
        password: hashedPasswords[3],
        gender: 'Male',
        birthday: '2004-04-04',
        CPF: '00987654321',
        address: 'Street 04, 04 - FGO',
        phone: '4844444444',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Kama',
        email: 'kama@email.com',
        password: hashedPasswords[4],
        gender: 'Other',
        birthday: '2005-05-05',
        CPF: '00000000000',
        address: 'Street 05, 05 - FGO',
        phone: '4855555555',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
