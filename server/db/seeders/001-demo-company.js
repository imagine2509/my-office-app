/* eslint-disable linebreak-style */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Companies',
      [
        {
          name: 'ГаражноСтроительныйКооператив',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'ООО СКГ',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Companies', null, {});
  },
};
