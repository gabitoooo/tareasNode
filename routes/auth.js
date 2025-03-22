const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Usuarios } = require("../models");
const router = express.Router();
require("dotenv").config();
const autenticar = require("../middlewares/authMiddleware");
const { store } = require("../controllers/UserController");

const secretKey = process.env.JWT_SECRET || "secreto";

router.post("/register", store);

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuarios.findOne({ where: { email } });

    if (!usuario || !bcrypt.compareSync(password, usuario.password)) {
      return res.status(401).json({ mensaje: "Credenciales incorrectas" });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      secretKey,
      { expiresIn: "1h" }
    );
    res.json({ message: "Login exitoso", token });
  } catch (error) {    
    res.status(500).json({ error: error.message });
  }
});



router.get("/me", autenticar, async (req, res) => {
  const usuario = await Usuarios.findByPk(req.user_id);
  res.json({ usuario });
});

module.exports = router;
