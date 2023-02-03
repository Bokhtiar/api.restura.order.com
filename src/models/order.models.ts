import { Schema, model } from "mongoose";
import { IOrder } from "../types/user/order.types";

const orderSchema: Schema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      trim: true,
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: Number,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    note: {
      type: String,
      required: true,
      default: null,
    },
    payment_name: {
      type: String,
      required: true,
      trim: true,
    },
    payment_number: {
      type: Number,
      required: true,
      trim: true,
    },
    payment_txid: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Order = model<IOrder>("Order", orderSchema);
