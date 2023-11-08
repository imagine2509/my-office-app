'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface) {
		await queryInterface.bulkInsert(
			'Offices',
			[
				{
					name: 'Seva Trap House',
					address: 'address 3',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Gipsys Gosha',
					address: 'address 2',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Kesha home',
					address: 'address 1',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete('Offices', null, {});
	},
};
