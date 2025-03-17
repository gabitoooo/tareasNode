const { Tareas } = require("../models");

exports.get = async (req, res) => {
  const data = await Tareas.findAll();
  res.json(data);
};
exports.store = async (req, res) => {
  const data = await Tareas.create(req.body);
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
    if (!data)
      return res.status(404).json({ error: "Tareas no encontrado" });

    await data.destroy();
    res.json({ message: "Tareas eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el data" });
  }
};
