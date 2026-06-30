import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import Transaction from "../models/transactionModel.js";
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
const CREDIT_MAP = { 100: 50, 200: 80, 500: 300 };
export const createCreditsOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    console.log("KEY ID:", process.env.RAZORPAY_KEY_ID);
    console.log("AMOUNT:", amount);
    if (!CREDIT_MAP[amount]) {
      return res.status(400).json({ message: "Invalid Credit Plan" });
    }

    const options = {
      amount: amount * 100, // Razorpay works in paise
      currency: "INR",
      receipt: `receipt_order_${Math.floor(Math.random() * 1000)}`,
    };
    const order = await razorpay.orders.create(options);
    await Transaction.create({
      user: userId,
      razorpayOrderId: order.id,
      amount: amount,
      creditsAdded: CREDIT_MAP[amount],
      status: "created",
    });
    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      creditsToAdd: CREDIT_MAP[amount],
    });
  } catch (error) {
    console.log("Razorpay Order Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      creditsToAdd,
    } = req.body;
    const userId = req.userId;

    // Create a signature using your secret to verify the payment is authentic
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Payment is legit! Add credits to the user.
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $inc: { credits: creditsToAdd } },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: "Payment verified successfully",
        newBalance: updatedUser.credits,
      });
    } else {
      await Transaction.findOneAndUpdate( { razorpayOrderId: razorpay_order_id },
        { status: "failed" }
      );
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Verification Error: ${error.message}` });
  }
};
export const getTransactionHistory = async (req, res) => {
  try {
    const history = await Transaction.find({
      user: req.userId,
      status: { $in: ["success", "failed"] },
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
