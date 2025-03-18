var express = require("express");
var router = express.Router();
const autenticar = require("../middlewares/authMiddleware");
const manejarErrores = require("../middlewares/handleErrorsMiddelware");

const {
  validarUpdate,
  validateDataRegister,
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

router.get("/tasks", get);
router.get("/tasks/:id", show);
router.post("/tasks", validateDataRegister, manejarErrores, store);
router.put("/tasks/:id", validarUpdate, manejarErrores, update);
router.delete("/tasks/:id", destroy);

module.exports = router;
