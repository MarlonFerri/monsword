'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
        id: 1,
        token: 1,
        name: 'John M. Doe',
        role_id: 1, // Manager
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        token: 2,
        name: 'Philip T. Doe',
        role_id: 2, // Technician
        created_at: new Date(),
        updated_at: new Date()
      },{
        id: 3,
        token: 3,
        name: 'Phoebe M. Doe',
        role_id: 1, // Manager
        created_at: new Date(),
        updated_at: new Date()
      },{
        id: 4,
        token: 4,
        name: 'Karen T. Doe',
        role_id: 2, // Technician
        created_at: new Date(),
        updated_at: new Date()
      }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
