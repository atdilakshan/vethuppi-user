const Payment = require("../models/paymentModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const makePayment = catchAsyncErrors(async (req, res) => {
  const { start_period, end_period,price } = req.body;
  const payment = await Payment.paymentModel.create({
    start_period,
    end_period,
    price,
    user: req.user._id,
  });
  res.status(201).json({
    success: true,
    payment,
  });
});

const getPayment = catchAsyncErrors(async (req, res) => {
  const payments = await Payment.paymentModel.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    payments,
  });
});

//update paymet
const updatePayment = catchAsyncErrors(async (req, res) => {
  const payment = await Payment.paymentModel.findById(req.params.id);

  if (!payment) {
    return next(new ErrorHander("Payment not found with this Id", 404));
  }

  if (payment.invoice_status === "false") {
    return next(new ErrorHander("You have wait for invoice", 400));
  }
  payment.invoice_status = req.body.status;
  payment.payment_status = req.body.payment_status;

  await payment.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

module.exports = {
  makePayment,
  getPayment,
  updatePayment,
};
