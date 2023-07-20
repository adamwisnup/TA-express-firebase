const express = require("express");
const { get_sensor, add_sensor } = require("../controllers/sensorController");

const router = express.Router();

router.get("/sensor", get_sensor);
router.post("/sensor", add_sensor);

module.exports = {
  routes: router,
};
