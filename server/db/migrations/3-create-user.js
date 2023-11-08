'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			firstName: {
				type: Sequelize.STRING,
			},
			lastName: {
				type: Sequelize.STRING,
			},
			email: {
				type: Sequelize.STRING,
			},
			password: {
				type: Sequelize.STRING,
			},
			activationString: {
				type: Sequelize.STRING,
			},
			officeId: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: 'Offices',
					},
					key: 'id',
				},
			},
			companyId: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: 'Companies',
					},
					key: 'id',
				},
			},
			birthDate: {
				type: Sequelize.DATE,
			},
			isAdmin: {
				type: Sequelize.BOOLEAN,
			},
			isActivated: {
				type: Sequelize.BOOLEAN,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Users');
	},
};
