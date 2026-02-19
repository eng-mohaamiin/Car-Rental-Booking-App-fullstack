import mongoose, { Schema } from "mongoose";

const bookinSchema = new Schema(
  {
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    pickupDate: {
      type: Date,
      required: true,
    },
    returnDate: {
      type: Date,
      required: true,
    },
    status: {
        type : String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },
    price: {
      type: Number,
      required: true,
    },
  },

  { timestamps: true },
);

const Booking = mongoose.model("Booking", bookinSchema);

export default Booking;
