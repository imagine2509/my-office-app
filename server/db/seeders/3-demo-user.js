'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface) {
		await queryInterface.bulkInsert(
			'Users',
			[
				{
					firstName: 'SevaGosha',
					lastName: 'Innokesha',
					email: 'qmail',
					password: 'password',
					activationString: 'activation',
					officeId: 1,
					companyId: 1,
					birthDate: new Date(2000, 11, 8),
					isAdmin: false,
					isActivated: false,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete('Users', null, {});
	},
};
