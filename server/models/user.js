'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// User.hasMany(models.Restaurant, { foreignKey: 'id' })
		}
	}
	User.init(
		{
			firstName: DataTypes.STRING,
			lastName: DataTypes.STRING,
			email: {
				type: DataTypes.STRING,
				unique: true,
			},
			username: {
				type: DataTypes.STRING,
				unique: true,
			},
			restaurant_id: {
				type: DataTypes.INTEGER,
			},
		},
		{
			sequelize,
			modelName: 'User',
		}
	)
	return User
}
