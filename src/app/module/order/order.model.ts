import mongoose, { Schema } from "mongoose";
import { TOrder } from "./order.interface";

// Define the schema for the Order
const OrderSchema: Schema = new Schema<TOrder>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      match: /.+\@.+\..+/, // Ensures the email is in a valid format
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product", // Replace 'Product' with your actual product model name
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1, // Ensures quantity is at least 1
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0, // Ensures totalPrice is not negative
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Create and export the model
const Order = mongoose.model<TOrder>("Order", OrderSchema);
export default Order;
