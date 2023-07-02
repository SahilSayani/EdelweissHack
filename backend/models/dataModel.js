const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Data = new Schema({
  symbol: { type: String, required: true },
  expiryDate: { type: Timestamp },
  strikePrice: { type: Number },
  optionType: { type: String, default: null },
  intrinsticValue: { type: String, defaul: null },
  IV: { type: Number },
  LTP: { type: Number, required: true },
  LTQ: { type: Number, required: true },
  totalTradedVolume: { type: Number, required: true },
  bestBid: { type: Number, required: true },
  bestAsk: { type: Number, required: true },
  bestBidQty: { type: Number, required: true },
  bestAskQty: { type: Number, required: true },
  openInterest: { type: Number, required: true },
  timestamp: { type: Timestamp, required: true },
  sequence: { type: Number, required: true },
  prevClosePrice: { type: Number, required: true },
  prevOpenInterest: { type: Number, required: true },
});
module.exports = mongoose.model("data", Data);