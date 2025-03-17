const { Usuarios } = require("../models");
const { Tareas } = require("../models");
exports.get = async (req, res) => {
  const data = await Usuarios.findAll();
  res.json(data);
};
exports.store = async (req, res) => {
  const data = await Usuarios.create(req.body);
  res.status(201).json(data);
};

exports.show = async (req, res) => {
  const data = await Usuarios.findByPk(req.params.id);
  if (!data) return res.status(404).json({ error: "usuario no encontrada" });
  res.json(data);
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

exports.showTasks = async (req, res) => {
  try {
    const user = await Usuarios.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const data = await Tareas.findAll({
      where: {
        usuarioId: user.id,
      },
    });
    res.json(data);
  } catch (error) {}
};
