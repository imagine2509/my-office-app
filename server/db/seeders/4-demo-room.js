'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface) {
		await queryInterface.bulkInsert(
			'Rooms',
			[
				{
					name: 'Seva',
					amount: 3,
					officeId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Gosha',
					amount: 2,
					officeId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Kesha',
					amount: 1,
					officeId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete('Rooms', null, {});
	},
};
