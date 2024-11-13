const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({
      username: `${firstName} ${lastName}`,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      isApproved: role === "host" ? false : true, // Non approuvé si `host`
    });
    res.status(201).json(user);
  } catch (error) {
    console.error("Error in user registration:", error);
    res.status(400).json({ error: "User registration failed", details: error });
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
  User.findAll()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json({ error: "Erreur serveur", err }));
};

// Mise à jour d'un utilisateur
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, password, role, isApproved } = req.body;
  
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Si un mot de passe est fourni, on le hache avant de le sauvegarder
    const updatedData = {
      firstName,
      lastName,
      email,
      role,
      isApproved,
    };
    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    await user.update(updatedData);
    res.json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  console.log("ID reçu pour suppression:",typeof id);
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    await user.destroy();
    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    res.status(500).json({ error: "Erreur interne lors de la suppression" });
  }
};

