const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuarios } = require('../models');
const router = express.Router();
require('dotenv').config();

const secretKey = process.env.JWT_SECRET || 'secreto';

// 📝 Registro de usuario
router.post('/register', async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const usuario = await Usuario.create({ nombre, email, password });
    res.json({ mensaje: 'Usuario registrado con éxito', usuario });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 🔑 Inicio de sesión
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario || !bcrypt.compareSync(password, usuario.password)) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ id: usuario.id, email: usuario.email }, secretKey, { expiresIn: '1h' });
    res.json({ mensaje: 'Login exitoso', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔒 Middleware de autenticación
const autenticar = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(403).json({ mensaje: 'Acceso denegado' });

  try {
    req.usuario = jwt.verify(token, secretKey);
    next();
  } catch (error) {
    res.status(401).json({ mensaje: 'Token inválido' });
  }
};

// 🔐 Ruta protegida
router.get('/perfil', autenticar, async (req, res) => {
  const usuario = await Usuario.findByPk(req.usuario.id);
  res.json({ usuario });
});

module.exports = router;