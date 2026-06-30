import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    razorpayOrderId: {
      type: String,
      required: true,
      unique: true,
    },
    razorpayPaymentId: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    creditsAdded: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["created", "success", "failed"],
      default: "created",
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
