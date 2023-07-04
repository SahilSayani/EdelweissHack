const Data = require("../models/dataModel");
const CurrentData = require("../models/currentData");

getLatestTimeStamp = async () => {
    try {
        return await CurrentData.findById({ _id: "timestamp" });
    } catch (error) {
        console.log(error);
    }
};

getAllDates = async () => {
    try {
        const data = await CurrentData.findById({ _id: "getDates" });
        return data;
    } catch (err) {
        console.log(err);
    }
};

updateLatestTimeStamp = async (timestamp) => {
    try {
        return await CurrentData.findByIdAndUpdate(
            "timestamp",
            { $set: timestamp },
            { new: true }
        );
    } catch (error) {
        console.log(error);
    }
};

addAllDates = async (newDate) => {
    try {
        const data = await CurrentData.findById({ _id: "getDates" });
        newDate = newDate.split(" ");
        var newData = [
            ...data.allDates,
            `${newDate[1]} ${newDate[2]} ${newDate[3]}`,
        ];
        var newData = [...new Set(newData)];
        data.allDates = newData;
        await data.save();
    } catch (err) {
        console.log(err);
    }
};

deleteAllDates = async (oldDate) => {
    try {
        await CurrentData.updateOne(
            { _id: "allDates" },
            { $pull: { allDates: oldDate } }
        );
    } catch (error) {
        console.log(error);
    }
};

exports.getAllData = async (req, res) => {
    try {
        const { symbol, expiryDate, strikePrice } = req.query;
        const { timestamp } = await getLatestTimeStamp();
        let data = await Data.find({
            symbol: symbol,
            timestamp: timestamp,
        }).sort({ strikePrice: 1 });
        if (expiryDate && expiryDate != "default") {
            console.log(expiryDate);
            data = data.filter((obj) => {
                return obj.expiryDate == expiryDate;
            });
        }
        if (strikePrice) {
            data = data.filter((obj) => {
                return obj.strikePrice == strikePrice;
            });
        }
        data = data.filter((obj) => {
            return obj.optionType !== "XX";
        });
        console.log(data.length);

        return res.status(200).json({
            status: "success",
            data,
        });
    } catch (error) {
        console.log(error);
    }
};

exports.getByDate = async (req, res) => {
    try {
        const { symbol, expiryDate, strikePrice, optionType } = req.query;
        const { timestamp } = await getLatestTimeStamp();
        const searchString = timestamp.slice(0, 10);
        let data = await Data.find({
            symbol: symbol,
            expiryDate: expiryDate,
            strikePrice: strikePrice,
            optionType: optionType,
            timestamp: { $regex: new RegExp(searchString) },
        });
        console.log(searchString, 'strr');
        return res.status(200).json({
            status: "success",
            data,
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
};

exports.create = async (packetData) => {
    try {
        console.log(packetData[0]);
        await updateLatestTimeStamp({ timestamp: packetData[0].timestamp });
        await addAllDates(packetData[0].timestamp);
        //await Data.insertMany(packetData);
        return;
    } catch (err) {
        console.log(err);
    }
};

exports.deleteData = async () => {
    try {
        let { allDates } = await getAllDates();
        //if (allDates.length < 3) return;
        allDates = allDates.sort((a, b) => new Date(a) - new Date(b));
        console.log(allDates);
        const startDate = new Date(allDates[0]);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getUTCDate() + 1);
        console.log(startDate, endDate, "testing");

        console.log(allDates[0], "test1");
    } catch (err) {
        console.log(err);
    }
};
