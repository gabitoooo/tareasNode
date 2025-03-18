const { check } = require("express-validator");

const { Tareas } = require("/models"); // Importa el modelo de Tareas
const estados = ["PENDIENTE", "PROGRESO", "COMPLETADO"];

const validarUpdate = [
  check("id")
    .isInt()
    .withMessage("El id debe ser un número entero")
    .notEmpty()
    .withMessage("El id es requerido")
    .custom(async (value) => {
      const tarea = await Tareas.findByPk(value);
      req.tarea = tarea;
      if (!tarea || tarea.usuarioId !== req.usuario.id) {
        throw new Error("la tarea no existe");
      }

      if (!estados.includes(req.body.estado)) {
        throw new Error("el estado enviado no esta permitido");
      }
      if (req.body.estado === "PROGRESO" && tarea.estado !== "PENDIENTE") {
        throw new Error(
          "Solo se puede marcar como en progreso si está en pendiente."
        );
      }
      if (
        req.body.estado === "PENDIENTE" &&
        (tarea.estado === "PROGRESO" || tarea.estado === "COMPLETADA")
      ) {
        throw new Error(
          "No se puede volver a pendiente por que la terea esta en estado de progreso o completada"
        );
      }
      if (req.body.estado === "COMPLETADA" && tarea.estado !== "PROGRESO") {
        throw new Error("Solo se puede marcar como completada en progreso");
      }
      if (tarea.estado === "COMPLETADA") {
        throw new Error(
          "No se puede modificar la tarea por que esta en estado completado"
        );
      }
      return true;
    }),
];

const validateDataRegister = [
  check("id")
    .isInt.withMessage("el valor del identificador no esta permitido")
    .notEmpty()
    .withMessage("El id es requerido"),
  check("titulo")
    .notEmpty()
    .withMessage("el titulo es requerido")
    .isString()
    .withMessage("el campo solo permite texto"),
  check("descripcion")
    .notEmpty()
    .withMessage("la descripcion es requerida")
    .isString()
    .withMessage("el campo solo permite texto"),
  check("fechaLimite")
    .notEmpty()
    .withMessage("la fechaLimite es requerida")
    .isISO8601()
    .withMessage("debe enviar una fecha y hora valida")
    .custom((value) => {
      if (moment(value).isBefore(moment())) {
        throw new Error(
          "La fecha límite debe ser mayor a la fecha y hora actual"
        );
      }
      return true;
    }),
];
module.exports = { validarUpdate, validateDataRegister };
