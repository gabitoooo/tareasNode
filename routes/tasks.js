var express = require("express");
var router = express.Router();
const autenticar = require("../middlewares/authMiddleware");
const validarCampos = require("../middlewares/handleErrorsMiddelware");

const {
  validarUpdate,
  validateDataRegister,
  validateFiltro,
} = require("../validators/tasksValidator");
const {
  get,
  store,
  show,
  update,
  destroy,
  storeComplete,
} = require("../controllers/TaskController");

router.use("/tasks", autenticar);

router.get("/tasks", validateFiltro, validarCampos, get);
router.get("/tasks/:id", show);
router.post("/tasks", validateDataRegister, validarCampos, store);
router.put("/tasks/:id", validarUpdate, validarCampos, update);
router.delete("/tasks/:id", destroy);

module.exports = router;
