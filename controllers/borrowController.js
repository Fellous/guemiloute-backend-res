const Borrow = require("../models/Borrow");
const Item = require("../models/Item");

exports.createBorrow = async (req, res) => {
  try {
    const borrow = await Borrow.create(req.body);
    res.status(201).json(borrow);
  } catch (error) {
    res.status(500).json({ error: "Unable to create borrow request" });
  }
};

exports.getBorrows = async (req, res) => {
  try {
    const borrows = await Borrow.findAll({ include: ["user", "item"] });
    res.json(borrows);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch borrows" });
  }
};

exports.updateBorrow = async (req, res) => {
  try {
    const borrow = await Borrow.update(req.body, {
      where: { id: req.params.id },
    });
    res.json(borrow);
  } catch (error) {
    res.status(500).json({ error: "Unable to update borrow" });
  }
};

exports.deleteBorrow = async (req, res) => {
  try {
    await Borrow.destroy({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Unable to delete borrow" });
  }
};
