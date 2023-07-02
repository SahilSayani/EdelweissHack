const data = require("../models/dataModel");

exports.getAllData = async (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      data,
    },
  });
};

exports.getSymbol = async (req, res) => {
  try {
    const symbol = await data.find(req.params.symbol);
    const date = await data.find(req.params.date);
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
    const time = await data.find(req.params.time);

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

exports.create = async (req, res) => {
  try {
    const newData = await data.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        data: newData,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
