const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class Loan extends Model {}

Loan.init({
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  loanDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
  },  
  returnDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: "Loan",
  tableName: "loans",
  timestamps: false,
  
});

module.exports = Loan;
