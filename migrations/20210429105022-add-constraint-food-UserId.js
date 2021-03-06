"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		queryInterface.addConstraint("Food", {
			fields: ["UserId"],
			type: "foreign key",
			name: "fk_UserId_Food",
			references: {
				//Required field
				table: "Users",
				field: "id",
			},
			onDelete: "cascade",
			onUpdate: "cascade",
		});
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
	},

	down: async (queryInterface, Sequelize) => {
		queryInterface.removeConstraint("Food", "fk_UserId_Food");
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
	},
};
