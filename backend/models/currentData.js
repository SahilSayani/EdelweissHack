const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const currentData = new Schema({
    _id: { type: String },
    timestamp: { type: Date },
    allDates: [{ type: Date }],
});

currentData.pre("save", function (next) {
    this.allDates.forEach((date, index) => {
        date.setUTCHours(0, 0, 0, 0);
        this.allDates[index] = date;
    });
    this.allDates = [...new Set(this.allDates)];
    next();
});

module.exports = mongoose.model("currentData", currentData);
