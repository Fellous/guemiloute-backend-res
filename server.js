require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const app = express();

// Enable CORS
app.use(
  cors({
    origin: (origin, callback) => {
      if (origin && /^http:\/\/localhost:30\d{2}$/.test(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);


// Middleware
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
