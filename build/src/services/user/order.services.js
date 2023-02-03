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
exports.userOrderService = void 0;
const cart_models_1 = require("../../models/cart.models");
const order_models_1 = require("../../models/order.models");
/* specific user find order list */
const findAll = ({ _id, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_models_1.Order.find({ user: _id });
});
/* find one by specific order */
const findOneById = ({ _id, user_id, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_models_1.Order.findOne({ _id: _id, user: user_id });
});
/* create new order */
const orderCreate = ({ userID, documents, }) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield cart_models_1.Cart.find({ order: null, user: userID });
    /* store documents */
    const newOrder = new order_models_1.Order({
        user: documents.user,
        name: documents.name,
        email: documents.email,
        phone: documents.phone,
        location: documents.location,
        note: documents.note,
        payment_name: documents.payment_name,
        payment_number: documents.payment_number,
        payment_txid: documents.payment_txid,
    });
    /* find by cart item, each cart item push order_id */
    if (newOrder) {
        results.forEach((element) => {
            element.order = newOrder._id;
            element.save();
        });
    }
    return newOrder.save();
});
/* specific order cart items */
const orderCartItems = ({ user_id, order_id, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cart_models_1.Cart.find({ user: user_id, order: order_id })
        .populate("product", "name sale_price regular_price image")
        .populate("user", "name email phone")
        .sort({ _id: -1 });
});
exports.userOrderService = {
    findAll,
    orderCreate,
    findOneById,
    orderCartItems,
};
