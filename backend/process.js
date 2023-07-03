const dataController = require("./controller/dataController");

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
    var date = new Date();
    date.setUTCHours(date.getUTCHours()+5);
    date.setUTCMinutes(date.getUTCMinutes() + 30);
    console.log(result[0]["timestamp"]);
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
    //dataController.deleteData();
    //dataController.create(result);
};

