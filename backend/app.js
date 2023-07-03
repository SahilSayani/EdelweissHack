const express = require("express");
const cors = require("cors");
const dataRouter = require("./routes/dataRoutes");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use((req, res, next) => {
  req.header("Access-Control-Allow-Origin", "*");
  req.header("Access-Control-Allow-Methods", "*");
  req.header("Access-Control-Allow-Headers", "*");
  req.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/api", dataRouter);
module.exports = app;
