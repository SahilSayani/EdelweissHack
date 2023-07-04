const dataController = require("./controller/dataController");
const moment = require("moment");

const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
];

exports.filterData = (data) => {
    const regex = /Publishing MarketData\{([^}]+)\}/g;
    const matches = data.match(regex);
    const result = [];
    if (!matches) {
        return;
    }
    matches.forEach((match) => {
        const keyValuePairs = match.match(/(\w+)=([^,]+)/g);
        const obj = {};
        keyValuePairs.forEach((pair) => {
            const [key, value] = pair.split("=");
            if (key === "prevOpenInterest") {
                obj[key] = parseInt(value.slice(0, value.length - 1), 10);
            } else {
                obj[key] = isNaN(value)
                    ? value.replace(/'/g, "")
                    : Number(value);
            }
        });

        result.push(obj);
    });
    var date = result[0]["timestamp"];
    const uniqueArray = [];
    const uniqueSet = new Set();
    for (obj of result) {
        for (j of months) {
            let pos = obj["symbol"].indexOf(j);
            if (pos != -1) {
                let symbol = obj["symbol"];
                obj["symbol"] = symbol.slice(0, pos - 2);
                obj["expiryDate"] = symbol.slice(pos - 2, pos + 5);
                obj["strikePrice"] = symbol.slice(pos + 5, symbol.length - 2);
                obj["optionType"] = symbol.slice(symbol.length - 2);
            }
        }
        obj["timestamp"] = date;
    }
    console.log(result[0].timestamp);
    // const da = Array.from(uniqueSet);
    // var momentDate = moment(da[0], "ddd MMM DD HH:mm:ss z YYYY");
    // var isoString = momentDate.toISOString();
    // var daate = new Date(isoString);
    // daate.setUTCHours(daate.getUTCHours() + 5);
    // daate.setUTCMinutes(daate.getUTCMinutes() + 30);
    // console.log(isoString);
    // console.log(uniqueSet, result.length, daate);
    // for (obj of result) {
    //     obj['timestamp']= daate;
    // }
    dataController.deleteData();
    dataController.create(result);
};
