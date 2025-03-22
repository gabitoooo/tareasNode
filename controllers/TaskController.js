const { Tareas } = require("../models");
const { estados } = require("../validators/tasksValidator");
const { Op } = require('sequelize');
exports.get = async (req, res) => {
  try {
    let search = {
      usuarioId: req.user_id,
    };
    if (req.query.estado) {
      if (!estados.includes(req.query.estado)) {
        return res.status(403).json({ message: "estado no permitido" });
      }
      search.estado = req.query.estado;
    }
    if (req.query.fecha) {
      search.fechaLimite = req.query.fecha;
    }
    if (req.query.search) {
      search.titulo = {
        [Op.like]: `%${req.query.search}%`,
      };
    }
    const data = await Tareas.findAll({
      where: search,
    });
    res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "error al recuperar tareas" });
  }
};
exports.store = async (req, res) => {
  const task = await Tareas.create({
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    estado: "PENDIENTE",
    fechaLimite: req.body.fechaLimite,
    usuarioId: req.user_id,
  });

  res.status(200).json({
    message: "Tarea creada exitosamente",
    task: task,
  });
};

exports.show = async (req, res) => {
  const tarea = await Tareas.findOne({
    where: {
      usuarioId: req.user_id,
      id: req.params.id,
    },
  });
  if (tarea) {
    res.json(tarea);
  } else {
    res.status(403).json({ error: "Tarea no encontrada" });
  }
};
exports.update = async (req, res) => {
  /*   const data = await Tareas.findByPk(req.params.id);
  if (!data) return res.status(404).json({ error: "Tareas no encontrado" }); */
  let tarea = req.tarea;
  await tarea.update({
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    estado: req.body.estado,
    fechaLimite: req.body.fechaLimite,
  });
  res.json(tarea);
};
exports.destroy = async (req, res) => {
  try {
    const tarea = await Tareas.findOne({
      where: {
        usuarioId: req.user_id,
        id: req.params.id,
      },
    });
    if (tarea) {
      await tarea.destroy();
      res.json({ message: "tarea eliminada" });
    } else {
      res.status(403).json({ error: "Tarea no encontrada" });
    }
  } catch (error) {
    res.status(403).json({ error: "Error al eliminar el data" });
  }
};

/* exports.storeComplete = async (req, res) => {
  try {
    const data = req.body;
  } catch (error) {}
}; */
