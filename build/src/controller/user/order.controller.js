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
exports.show = exports.store = exports.index = void 0;
const mongoose_1 = require("mongoose");
const cart_services_1 = require("../../services/user/cart.services");
const order_services_1 = require("../../services/user/order.services");
/* find all order for specific user */
const index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = req.user.id;
        const results = yield order_services_1.userOrderService.findAll({
            _id: new mongoose_1.Types.ObjectId(userID),
        });
        res.status(200).json({
            status: true,
            data: results,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.index = index;
/* create new documents */
const store = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = req.user.id;
        /* available cart */
        const availableCart = yield cart_services_1.cartService.findAll({
            _id: new mongoose_1.Types.ObjectId(userID),
        });
        console.log("cc", availableCart);
        if (availableCart.length === 0) {
            return res.status(404).json({
                status: false,
                message: "Add to cart not available",
            });
        }
        const { name, email, phone, location, note, payment_name, payment_number, payment_txid, } = req.body;
        const documents = {
            user: new mongoose_1.Types.ObjectId(userID),
            name,
            email,
            phone,
            location,
            note,
            payment_name,
            payment_number,
            payment_txid,
        };
        yield order_services_1.userOrderService.orderCreate({
            userID: new mongoose_1.Types.ObjectId(userID),
            documents: Object.assign({}, documents),
        });
        res.status(200).json({
            status: true,
            data: "Order created",
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.store = store;
/* find specific order details */
const show = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userID = req.user.id;
        /* order details info */
        const orderDocuments = yield order_services_1.userOrderService.findOneById({
            _id: new mongoose_1.Types.ObjectId(id),
            user_id: new mongoose_1.Types.ObjectId(userID),
        });
        /* order cart items */
        const cartItems = yield order_services_1.userOrderService.orderCartItems({
            user_id: new mongoose_1.Types.ObjectId(userID),
            order_id: new mongoose_1.Types.ObjectId(id),
        });
        res.status(200).json({
            status: true,
            data: { "Order": orderDocuments, "Cart": cartItems },
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.show = show;
