const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Loan = require("./Loan");

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("borrower", "host", "admin"),
    allowNull: false,
    defaultValue: "borrower",
  },
  isApproved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: true,
});

// Associations
User.hasMany(Loan, { foreignKey: "user_id", onDelete: "CASCADE" });
Loan.belongsTo(User, { foreignKey: "user_id" });

module.exports = User;
