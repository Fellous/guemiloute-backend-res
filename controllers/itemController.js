const Item = require("../models/Item");
const path = require("path");
const fs = require("fs");

exports.createItem = async (req, res) => {
  try {
    const { title, description, status, category, quantity } = req.body;

    // Gestion de l'upload de l'image
    const imageUrl = req.file ? `/img/${req.file.filename}` : null;

    if (req.file) {
      const destinationPath = path.join(
        __dirname,
        "../../guemiloute/public/img/",
        req.file.filename
      );

      // Déplacement du fichier téléchargé vers le dossier img du frontend
      fs.renameSync(req.file.path, destinationPath);
    }

    const newItem = await Item.create({
      title,
      description,
      status,
      category,
      quantity,
      image_url: imageUrl,
    });

    res.status(201).json(newItem);
  } catch (error) {
    console.error("Erreur lors de la création de l'item :", error);
    res
      .status(500)
      .json({ error: "Impossible de créer l'item", details: error });
  }
};

exports.getItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (error) {
    console.error("Erreur lors de la récupération des items :", error);
    res
      .status(500)
      .json({ error: "Impossible de récupérer les items", details: error });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const { title, description, status, category, quantity, image_url } =
      req.body;

    const updatedItem = await Item.update(
      {
        title,
        description,
        status,
        category,
        quantity,
        image_url,
      },
      { where: { id: req.params.id } }
    );

    res.json(updatedItem);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'item :", error);
    res
      .status(500)
      .json({ error: "Impossible de mettre à jour l'item", details: error });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    await Item.destroy({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    console.error("Erreur lors de la suppression de l'item :", error);
    res
      .status(500)
      .json({ error: "Impossible de supprimer l'item", details: error });
  }
};
