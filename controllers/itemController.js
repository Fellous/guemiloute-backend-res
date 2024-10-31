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
    console.error("Erreur lors de la récupération des items :", error); // Affiche l'erreur complète
    res.status(500).json({ error: "Unable to fetch items", details: error });
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
