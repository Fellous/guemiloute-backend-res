const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

exports.registerUser = async (req, res) => {
  const { username, email, password, role } = req.body; // Inclure "role" si nécessaire
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || "borrower", // Définir un rôle par défaut si aucun n'est fourni
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "User registration failed" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve user profile" });
  }
};
exports.getAllUsers = (req, res) => {
  // Exemple de fonction pour récupérer tous les utilisateurs
  User.findAll()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json({ error: "Erreur serveur" ,err}));
};
