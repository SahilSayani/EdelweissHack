const express = require("express");
const cors = require("cors");
const dataRouter = require("./routes/dataRoutes");

const app = express();

app.use("/api", dataRouter);
app.use(cors());

module.exports = app;
