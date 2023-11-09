'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface) {
		await queryInterface.bulkInsert(
			'Companies',
			[
				{
					name: 'SevaGoshaKesha',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete('Companies', null, {});
	},
};
