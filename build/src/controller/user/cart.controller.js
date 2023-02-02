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
exports.destroy = exports.decrement = exports.increment = exports.store = exports.index = void 0;
const mongoose_1 = require("mongoose");
const cart_services_1 = require("../../services/user/cart.services");
/* specidic user find all cart */
const index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.user;
        const results = yield cart_services_1.cartService.findAll({ _id: new mongoose_1.Types.ObjectId(id) });
        const countCart = yield cart_services_1.cartService.CountDocument({ _id: new mongoose_1.Types.ObjectId(id) });
        res.status(200).json({
            status: true,
            data: results,
            countCart: countCart
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.index = index;
/* store documents */
const store = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params; //product id
        const userID = req.user.id;
        console.log("user", userID);
        const result = yield cart_services_1.cartService.addToCart({ user_id: new mongoose_1.Types.ObjectId(userID), product_id: new mongoose_1.Types.ObjectId(id) });
        res.status(201).json({
            status: true,
            data: result,
            message: "Cart added"
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.store = store;
const increment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield cart_services_1.cartService.CartIncrement({ _id: new mongoose_1.Types.ObjectId(id) });
        res.status(201).json({
            status: true,
            message: "Cart quantity increment"
        });
    }
    catch (error) {
        if (error) {
            console.log(error);
            next(error);
        }
    }
});
exports.increment = increment;
const decrement = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield cart_services_1.cartService.CartDecrement({ _id: new mongoose_1.Types.ObjectId(id) });
        res.status(201).json({
            status: true,
            message: "Cart quantity decrement"
        });
    }
    catch (error) {
        if (error) {
            console.log(error);
            next(error);
        }
    }
});
exports.decrement = decrement;
/* destory */
const destroy = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield cart_services_1.cartService.CartDestroy({ _id: new mongoose_1.Types.ObjectId(id) });
        res.status(200).json({
            status: true,
            message: "Cart deleted"
        });
    }
    catch (error) {
        if (error) {
            console.log(error);
            next(error);
        }
    }
});
exports.destroy = destroy;
