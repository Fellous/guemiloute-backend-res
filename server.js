require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Import des routes
const userRoutes = require("./routes/user");
const itemRoutes = require("./routes/item");
const borrowRoutes = require("./routes/borrow");

app.use("/api/users", userRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/borrows", borrowRoutes);

// Synchroniser la base de données
sequelize.sync({ alter: true })
  .then(() => console.log("Base de données synchronisée"))
  .catch(err => console.error("Erreur de synchronisation :", err));

// Démarrer le serveur
const PORT = process.env.PORT || 3020;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
