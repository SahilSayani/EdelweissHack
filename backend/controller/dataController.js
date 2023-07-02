const Data = require("../models/dataModel");
const moment = require("moment-timezone");

exports.getAllData = async (req, res) => {
    const { symbol, expiryDate } = req.query;
    let data = await Data.find({});
    if (symbol) {
        data = data.filter((obj) => {
            return obj.symbol == symbol;
        });
    }
    if (expiryDate) {
        data = data.filter((obj) => {
            return obj.expiryDate == expiryDate;
        });
    }

    res.status(200).json({
        status: "success",
        data,
    });
};

exports.getSymbol = async (req, res) => {
    try {
        const symbol = await Data.find(req.params.symbol);
        const date = await Data.find(req.params.date);
        // Tour.findOne({ _id: req.params.id })

        res.status(200).json({
            status: "success",
            data: {
                symbol,
                date,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
};

exports.getTime = async (req, res) => {
    try {
        const time = await Data.find(req.params.time);

        res.status(200).json({
            status: "success",
            data: {
                time,
            },
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
        await data.insertMany(packetData);
        //await data.create(packetData);
        return;
    } catch (err) {
        console.log(err);
    }
};

exports.deleteData = async (req, res) => {
    try {
        await data.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: "success",
            data: null,
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
};
