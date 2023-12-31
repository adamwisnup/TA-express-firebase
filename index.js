"use strict";
const express = require("express");
const cors = require("cors");
const config = require("./config");
const sensorRoutes = require("./routes/sensorRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", sensorRoutes.routes);

app.listen(config.port, () =>
  console.log("App is listening on url http://localhost:" + config.port)
);
