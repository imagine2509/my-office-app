'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const tokens = [];
    tokens.push(
      {
      refreshToken: "something1",
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      refreshToken: "something2",
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      refreshToken: "something3",
      userId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
      },
    )
    await queryInterface.bulkInsert('Tokens', tokens, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Tokens', null, { restartIdentity: true, truncate: true });
  }
};
