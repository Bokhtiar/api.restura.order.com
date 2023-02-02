"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartService = void 0;
const cart_models_1 = require("../../models/cart.models");
/* sepecific user count cart list */
const CountDocument = ({ _id }) => __awaiter(void 0, void 0, void 0, function* () {
    return cart_models_1.Cart.countDocuments({ user: _id, order: null });
});
/* specific user find cart */
const findAll = ({ _id }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cart_models_1.Cart.find({ user: _id, order: null });
});
/* cart store documents */
const addToCart = ({ product_id, user_id }) => __awaiter(void 0, void 0, void 0, function* () {
    /* find one cart already exist */
    const existCart = yield cart_models_1.Cart.findOne({ user: user_id, product: product_id, order: null });
    if (existCart) {
        let existQty;
        existQty = existCart.quantity;
        return yield cart_models_1.Cart.findByIdAndUpdate(existCart._id, { $set: { quantity: existQty + 1 } });
    }
    else {
        const newCart = new cart_models_1.Cart({
            user: user_id,
            product: product_id
        });
        return yield newCart.save();
    }
});
/* cart increment */
const CartIncrement = ({ _id }) => __awaiter(void 0, void 0, void 0, function* () {
    const existCart = yield cart_models_1.Cart.findOne({ _id: _id });
    console.log("exist cart", existCart.quantity);
    let existQty;
    existQty = existCart.quantity;
    return yield cart_models_1.Cart.findByIdAndUpdate(_id, { $set: { quantity: existQty + 1 } });
});
const CartDecrement = ({ _id }) => __awaiter(void 0, void 0, void 0, function* () {
    const existCart = yield cart_models_1.Cart.findOne({ _id: _id });
    let existQty;
    existQty = existCart.quantity;
    return yield cart_models_1.Cart.findByIdAndUpdate(_id, { $set: { quantity: existQty - 1 } });
});
const CartDestroy = ({ _id }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cart_models_1.Cart.findByIdAndDelete({ _id });
});
exports.cartService = {
    CountDocument,
    findAll,
    addToCart,
    CartIncrement,
    CartDecrement,
    CartDestroy
};
