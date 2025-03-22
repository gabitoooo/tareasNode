const jwt = require("jsonwebtoken");
require("dotenv").config();

const autenticar = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ mensaje: "accceso denegado." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secreto");
    req.user_id = decoded.id;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ mensaje: "no autorizado" });
  }
};

module.exports = autenticar;
