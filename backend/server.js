const mongoose = require("mongoose");
require("dotenv").config();
const { filterData } = require("./process");
const { spawn } = require("child_process");
const app = require("./app");

const DB = process.env.DATABASE;
const command = "java";
const args = [
    "-Ddebug=true",
    "-Dspeed=2",
    "-classpath",
    "./feed-play-1.0.jar",
    "hackathon.player.Main",
    "dataset.csv",
    "9014",
];

mongoose
    .connect(DB, {
        useNewUrlParser: true,
    })
    .then(() => console.log("DB connection successful!"));

const port = process.env.PORT || 4000;
const getPacket = spawn(command, args);
let arr = "";
getPacket.stdout.on("data", (data) => {
    arr += data.toString();
});

getPacket.stderr.on("data", (data) => {
    console.error(`Command error: ${data}`);
});

getPacket.on("close", (code) => {
    console.log(`Command exited with code ${code}`);
});

app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

setInterval(() => {
  filterData(arr);
  arr = "";
}, 6000);