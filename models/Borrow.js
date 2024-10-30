const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Item = require("./Item");

const Borrow = sequelize.define("Borrow", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  borrowDate: { type: DataTypes.DATE, allowNull: false },
  returnDate: { type: DataTypes.DATE },
  status: { type: DataTypes.STRING, defaultValue: "pending" },
});

// Relations
Borrow.belongsTo(User, { foreignKey: "userId", as: "user" });
Borrow.belongsTo(Item, { foreignKey: "itemId", as: "item" });

module.exports = Borrow;
