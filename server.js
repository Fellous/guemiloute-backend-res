require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");

const app = express();

// Enable CORS
app.use(cors({ origin: "http://localhost:3001" })); // Set this to your frontend URL

// Middleware
app.use(express.json());

// Import routes
const userRoutes = require("./routes/user");
app.use("/api/users", userRoutes);
const itemRoutes = require("./routes/item");
app.use("/api/items", itemRoutes);
const borrowRoutes = require("./routes/borrow");
app.use("/api/borrows", borrowRoutes);

// Connect to MySQL
sequelize
  .sync()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Database error: ", err));

// Start server
app.listen(3020, () => console.log("Server started on port 3020"));
