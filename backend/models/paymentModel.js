const mongoose = require("mongoose");
const paymentCollection = "payment"; // collection name
const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  price: {
    type: Number,
    ref: "Product",
    required: true,
  },
  start_period: {
    type: "string",
    required: true,
  },
  end_period: {
    type: "string",
    required: true,
  },
  invoice_status: {
    type: "boolean",
    default: "false",
  },
  payment_status: {
    type: "boolean",
    default: "false",
  },
});
module.exports.paymentModel = mongoose.model(paymentCollection, paymentSchema);
