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
        newDate.setUTCHours(0, 0, 0, 0);
        var newData = [...(data.allDates), newDate];
        newData = [
            ...new Set(
                newData.map((dateString) => new Date(dateString).getTime())
            ),
        ].map((timestamp) => new Date(timestamp).toISOString());
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
        const { symbol, expiryDate } = req.query;
        const { timestamp } = await getLatestTimeStamp();
        let data = await Data.find({
            symbol: symbol,
            timestamp: timestamp,
        });
        if (expiryDate) {
            data = data.filter((obj) => {
                return obj.expiryDate == expiryDate;
            });
        }
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
        const { symbol } = req.query;
        const { timestamp } = await getLatestTimeStamp();
        const startDate = new Date(timestamp);
        startDate.setUTCHours(0, 0, 0, 0);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getUTCDate() + 1);
        let data = await Data.find({
            symbol: symbol,
            timestamp: { $gte: startDate, $lt: endDate },
        });
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
        console.log(packetData);
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
        //Data.deleteMany({ timestamp: { $gte: startDate, $lt: endDate } });
        //await deleteAllDates(allDates[0]);

        console.log(allDates[0], "test1");
    } catch (err) {
        console.log(err);
    }
};
