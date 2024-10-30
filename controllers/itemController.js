const Item = require("../models/Item");

exports.createItem = async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: "Unable to create item" });
  }
};

exports.getItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch items" });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const item = await Item.update(req.body, { where: { id: req.params.id } });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Unable to update item" });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    await Item.destroy({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Unable to delete item" });
  }
};
