"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const mongoose_1 = require("mongoose");
const cartSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        trim: true,
        required: true
    },
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product",
        trim: true,
        required: true
    },
    order: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Order",
        trim: true,
        default: null,
    },
    quantity: {
        type: Number,
        trim: true,
        default: 1,
    }
}, {
    timestamps: true,
});
exports.Cart = (0, mongoose_1.model)("Cart", cartSchema);
