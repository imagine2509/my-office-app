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
    const demoOffices = [
      {
        name: 'Главный офис',
        address: 'г. Москва, ул. Петровка, д. 2, этаж 1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        name: 'Склад',
        address: 'г.Москва, ул. Электродная, д. 3Б',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Колл-центр',
        address: 'г.Новосибирск, Красный проспект, 86, оф. 14',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Офис 'Север'",
        address: 'г Москва, Сигнальный проезд, 7Б, стр.2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Офис 'Подмосковье'",
        address: 'г. Наро-Фоминск, ул Профсоюзная, д. 37А, офис 407',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]
   await queryInterface.bulkInsert('Offices', demoOffices, {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Offices', null, { restartIdentity: true, truncate: true });
  }
};
