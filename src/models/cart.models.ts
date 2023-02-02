import { Schema, model } from "mongoose";
import { ICart } from '../types/user/cart.types'

const cartSchema: Schema = new Schema<ICart>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            trim: true,
            required: true
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            trim: true,
            required: true
        },
        order: {
            type: Schema.Types.ObjectId,
            ref: "Order",
            trim: true,
            default: null,
        },
        quantity: {
            type: Number,
            trim: true,
            default: 1,
        }
    },
    {
        timestamps: true,
    }
);

export const Cart = model<ICart>("Cart", cartSchema);
