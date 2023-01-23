'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('roles', [{
        id: 1,
        name: 'Manager',
        created_at: new Date(),
        updated_at: new Date()
      },{
        id: 2,
        name: 'Technician',
        created_at: new Date(),
        updated_at: new Date()
      }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('roles', null, {});     
  }
};
