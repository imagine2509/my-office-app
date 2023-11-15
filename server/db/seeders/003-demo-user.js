/* eslint-disable linebreak-style */
/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password', salt);
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'Gosha',
          lastName: 'Goshenka',
          email: 'Gemail',
          password: hashedPassword,
          activationString: 'activation',
          officeId: 1,
          companyId: 1,
          birthDate: new Date(2000, 11, 8),
          isAdmin: true,
          isActivated: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Seva',
          lastName: 'Sevushka',
          email: 'Semail',
          password: hashedPassword,
          activationString: 'activation',
          officeId: 2,
          companyId: 2,
          birthDate: new Date(1960, 11, 8),
          isAdmin: true,
          isActivated: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Kesha',
          lastName: 'Keshenka',
          email: 'Kemail',
          password: hashedPassword,
          activationString: 'activation',
          officeId: 1,
          companyId: 1,
          birthDate: new Date(2003, 11, 8),
          isAdmin: true,
          isActivated: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
