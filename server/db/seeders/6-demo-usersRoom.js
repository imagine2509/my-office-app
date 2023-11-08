'use strict';

/** @type {import('sequelize-cli').Migration} */

const currentTime = new Date();

module.exports = {
	async up(queryInterface) {
		await queryInterface.bulkInsert(
			'UserRooms',
			[
				{
					roomId: 3,
					userId: 1,
					startTime: new Date(),
					endTime: new Date(currentTime.setHours(currentTime.getHours() + 1)),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					roomId: 2,
					userId: 1,
					startTime: new Date(),
					endTime: new Date(currentTime.setHours(currentTime.getHours() + 1)),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					roomId: 1,
					userId: 1,
					startTime: new Date(),
					endTime: new Date(currentTime.setHours(currentTime.getHours() + 1)),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					roomId: 3,
					userId: 1,
					startTime: new Date(currentTime.setHours(currentTime.getHours() + 1)),
					endTime: new Date(currentTime.setHours(currentTime.getHours() + 2)),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					roomId: 2,
					userId: 1,
					startTime: new Date(currentTime.setHours(currentTime.getHours() + 1)),
					endTime: new Date(currentTime.setHours(currentTime.getHours() + 2)),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					roomId: 1,
					userId: 1,
					startTime: new Date(currentTime.setHours(currentTime.getHours() + 1)),
					endTime: new Date(currentTime.setHours(currentTime.getHours() + 2)),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					roomId: 3,
					userId: 1,
					startTime: new Date(currentTime.setHours(currentTime.getHours() + 2)),
					endTime: new Date(currentTime.setHours(currentTime.getHours() + 3)),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					roomId: 2,
					userId: 1,
					startTime: new Date(currentTime.setHours(currentTime.getHours() + 2)),
					endTime: new Date(currentTime.setHours(currentTime.getHours() + 3)),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					roomId: 1,
					userId: 1,
					startTime: new Date(currentTime.setHours(currentTime.getHours() + 2)),
					endTime: new Date(currentTime.setHours(currentTime.getHours() + 3)),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete('UserRooms', null, {});
	},
};
