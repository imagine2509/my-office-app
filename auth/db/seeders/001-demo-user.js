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
    const users = [];
    users.push(
      {
        firstName:"Всеволод",
        lastName: "Насонов",
        birthDay: "1990-01-01",
        email: "nasonov@vsevolod.ru",
        password: "Qwerty12345",
        role: "user",
        isActivated: "true",
        activationString: "tomthecat",
        officeId: "1",
        companyId: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName:"Иннокентий",
        lastName: "Винокуров",
        birthDay: "1990-01-01",
        email: "innokentiy@vinokurov.ru",
        password: "Qwerty12345",
        role: "user",
        isActivated: "true",
        activationString: "tomthecat",
        officeId: "1",
        companyId: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName:"Георгий",
        lastName: "Седов",
        birthDay: "1990-01-01",
        email: "georgiy@sedov.ru",
        password: "Qwerty12345",
        role: "user",
        isActivated: "true",
        activationString: "tomthecat",
        officeId: "1",
        companyId: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      )
    await queryInterface.bulkInsert('Users', users, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, { restartIdentity: true, truncate: true });
  }
};
