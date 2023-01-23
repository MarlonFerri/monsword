'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('tasks', [{
        user_id: 2,
        summary:  "Task to do now 1.",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: 4,
        summary: "Task to do now 2.",
        created_at: new Date(),
        updated_at: new Date()
      },{
        user_id: 4,
        summary: "Task to do now 3.",
        created_at: new Date(),
        updated_at: new Date()
      },{
        user_id: 4,
        summary: "Task to do now 4.",
        date: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('tasks', null, {});
  }
};
