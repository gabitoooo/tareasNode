const { Tareas } = require("../models");
const { Usuarios } = require("../models");

exports.get = async (req, res) => {
  try {
    const data = await Tareas.findAll({
      where: {
        usuarioId: req.usuario.id,
      },
    });
    res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "error al recuperar tareas" });
  }
};
exports.store = async (req, res) => {
  const data = await Tareas.create({
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    estado: "PENDIENTE",
    fechaLimite: req.body.fechaLimite,
  });
  res.status(201).json(data);
};

exports.show = async (req, res) => {
  const data = await Tareas.findByPk(req.params.id);
  if (!data) return res.status(404).json({ error: "tarea no encontrada" });
  res.json(data);
};
exports.update = async (req, res) => {
  const data = await Tareas.findByPk(req.params.id);
  if (!data) return res.status(404).json({ error: "Tareas no encontrado" });
  await data.update(req.body);
  res.json(data);
};
exports.destroy = async (req, res) => {
  try {
    const data = await Tareas.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Tareas no encontrado" });

    await data.destroy();
    res.json({ message: "Tareas eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el data" });
  }
};

exports.storeComplete = async (req, res) => {
  try {
    const data = req.body;
  } catch (error) {}
};
