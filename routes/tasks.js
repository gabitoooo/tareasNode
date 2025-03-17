var express = require("express");
var router = express.Router();
const autenticar = require("../middlewares/authMiddleware");

const {
  get,
  store,
  show,
  update,
  destroy,
} = require("../controllers/TaskController");
/* GET users listing. */

router.get("/tasks", get);
router.get("/tasks/:id", store);
router.post("/tasks", show);
router.put("/tasks/:id", update);
router.delete("/tasks/:id", destroy);

module.exports = router;
