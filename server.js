require("dotenv").config();
const express = require("express");
const sequelize = require("./config/database");
const app = express();

app.use(express.json());

// Import des routes
const userRoutes = require("./routes/user");
app.use("/api/users", userRoutes);
const itemRoutes = require("./routes/item");
app.use("/api/items", itemRoutes);
const borrowRoutes = require("./routes/borrow");
app.use("/api/borrows", borrowRoutes);


// Connexion à MySQL
sequelize
  .sync()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Database error: ", err));

app.listen(3020, () => console.log("Server started on port 3020"));
