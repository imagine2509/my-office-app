/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const demoOffices = [
      {
        name: 'Главный офис',
        address: 'г. Москва, ул. Петровка, д. 2, этаж 1',
        companyId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Склад',
        address: 'г.Москва, ул. Электродная, д. 3Б',
        companyId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Колл-центр',
        address: 'г.Новосибирск, Красный проспект, 86, оф. 14',
        companyId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Офис 'Север'",
        address: 'г Москва, Сигнальный проезд, 7Б, стр.2',
        companyId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Офис 'Подмосковье'",
        address: 'г. Наро-Фоминск, ул Профсоюзная, д. 37А, офис 407',
        companyId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Seva Trap House',
        address: '5108 Woodley Ave, Encino, CA 91436',
        companyId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Gipsys Gosha',
        address: 'Bolotnaya Naberezhnaya, 3, строение 2',
        companyId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Kesha home',
        address: 'г. Москва, набережная Лихоборская, д. 18 стр. 3 этаж 1 офис 186А',
        companyId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('Offices', demoOffices, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Offices', null, { restartIdentity: true, truncate: true });
  },
};
