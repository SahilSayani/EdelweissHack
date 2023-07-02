const express = require("express");

const dataRouter = require("./routes/dataRoutes");

const app = express();

app.use("/api", dataRouter);

module.exports = app;
