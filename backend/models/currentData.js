const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const currentData = new Schema({
    _id: { type: String },
    timestamp: { type: String },
    allDates: [{ type: Date }],
});

module.exports = mongoose.model("currentData", currentData);
