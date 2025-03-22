var express = require("express");
var router = express.Router();
const autenticar = require("../middlewares/authMiddleware");

const {
  // get,
  //store,
  // show,
  //update,
  //destroy
} = require("../controllers/UserController");
//const { route } = require("./auth");
/* GET users listing. */

router.use("/users", autenticar);


//router.get("/users", get);
//router.get("/users/:id", show);
//router.post("/users", store);
//router.put("/users/:id", update);
//router.delete("/users/:id", destroy);


module.exports = router;
