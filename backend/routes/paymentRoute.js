const express = require("express");
const {
  makePayment,
  getPayment,
  updatePayment,
} = require("../controllers/paymentCtrl");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/payment/process").post(isAuthenticatedUser, makePayment);

router
  .route("/payment/me")
  .get(isAuthenticatedUser, authorizeRoles("user"), getPayment);
router
  .route("/admin/payment/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updatePayment);

//router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);

module.exports = router;
