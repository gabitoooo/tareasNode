const { validationResult } = require("express-validator");
const manejarErrores = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errores: errors.array() });
  }
  next();
};

module.exports = { manejarErrores };
