const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next(); // Si no hay errores, continúa con el siguiente middleware/controlador
};

module.exports = validarCampos;