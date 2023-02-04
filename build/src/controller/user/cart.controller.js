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
const helper_1 = require("../../helper");
const axios_config_1 = require("../../config/axios.config");
const cart_services_1 = require("../../services/user/cart.services");
/* specidic user find all cart */
const index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.user;
        const api_key = req.headers.api_key;
        const token = yield req.headers.authorization;
        /* generate http request header */
        // const generatedHeader = await getHeader(api_key, token);
        const generatedHeader = yield (0, helper_1.getHeaderWithoutToken)(api_key);
        console.log("asdfas", generatedHeader);
        const items = [];
        const results = yield cart_services_1.cartService.findAll({ _id: new mongoose_1.Types.ObjectId(id) });
        const countCart = yield cart_services_1.cartService.CountDocument({
            _id: new mongoose_1.Types.ObjectId(id),
        });
        //  const pid = "63db4d5e7d7bc0ba1b0e4042";
        // const item = await axiosRequest.get(
        //     `/api/v1/product/${pid}`,
        //     generatedHeader
        //   )
        //   console.log("items product", item.data.data);
        const getProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
            let product = yield axios_config_1.axiosRequest.get(`/api/v1/product/${id}`, generatedHeader);
            return product.data.data;
        });
        for (let i = 0; i < results.length; i++) {
            const element = results[i];
            items.push({
                _id: element._id,
                product: yield getProduct(element.product),
                quantity: element.quantity
            });
        }
        res.status(200).json({
            status: true,
            data: items,
            countCart: countCart,
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
        const result = yield cart_services_1.cartService.addToCart({
            user_id: new mongoose_1.Types.ObjectId(userID),
            product_id: new mongoose_1.Types.ObjectId(id),
        });
        res.status(201).json({
            status: true,
            data: result,
            message: "Cart added",
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
            message: "Cart quantity increment",
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
            message: "Cart quantity decrement",
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
            message: "Cart deleted",
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
