const { Usuarios } = require("../models");
const bcrypt = require("bcryptjs");

exports.get = async (req, res) => {
  const data = await Usuarios.findAll();
  res.json(data);
};
exports.store = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    const usuario = await Usuarios.create({
      nombre,
      email,
      password: await bcrypt.hash(password, 10),
    });
  /*   let data={...usuario.dataValues};
    delete data.id;
    delete data.createdAt;
    delete data.updatedAt; */
    res.json(usuario);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};


exports.update = async (req, res) => {
  const data = await Usuarios.findByPk(req.params.id);
  if (!data) return res.status(404).json({ error: "usuario no encontrado" });
  await data.update(req.body);
  res.json(data);
};

exports.destroy = async (req, res) => {
  try {
    const data = await Usuarios.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "usuario no encontrado" });

    await data.destroy();
    res.json({ message: "usuario eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};
