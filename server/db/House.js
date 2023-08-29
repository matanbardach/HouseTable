const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database');

class House extends Model {}

House.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		address: {
			type: DataTypes.STRING,
		},
		currentValue: {
			type: DataTypes.FLOAT,
            defaultValue: 0
		},
		loanAmount: {
			type: DataTypes.FLOAT,
            defaultValue: 0
		},
		risk: {
			type: DataTypes.FLOAT,
            defaultValue: 0
		},
	},
	{
		sequelize,
		modelName: 'house',
	}
);

module.exports = House;
