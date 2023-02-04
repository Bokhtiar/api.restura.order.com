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
const helper_1 = require("../../helper");
const axios_config_1 = require("../../config/axios.config");
/* find all order for specific user */
const index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = req.user.id;
        const api_key = req.headers.api_key;
        const token = yield req.headers.authorization;
        const items = [];
        const generatedHeader = yield (0, helper_1.getHeader)(api_key, token);
        const results = yield order_services_1.userOrderService.findAll({
            _id: new mongoose_1.Types.ObjectId(userID),
        });
        const getUser = () => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield axios_config_1.axiosAuthRequest.get(`/api/v1/user/me`, generatedHeader);
            return data.data.data;
        });
        for (let i = 0; i < results.length; i++) {
            const element = results[i];
            items.push({
                _id: element._id,
                user: yield getUser(),
                name: element.name,
                email: element.email,
                phone: element.phone,
                note: element.note,
                payment_name: element.payment_name,
                payment_number: element.payment_number,
                payment_txid: element.payment_txid
            });
        }
        res.status(200).json({
            status: true,
            data: items,
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
        const api_key = req.headers.api_key;
        const generatedHeader = yield (0, helper_1.getHeaderWithoutToken)(api_key);
        const items = [];
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
        const getProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
            let product = yield axios_config_1.axiosRequest.get(`/api/v1/product/${id}`, generatedHeader);
            return product.data.data;
        });
        for (let i = 0; i < cartItems.length; i++) {
            const element = cartItems[i];
            items.push({
                _id: element._id,
                product: yield getProduct(element.product),
                quantity: element.quantity
            });
        }
        res.status(200).json({
            status: true,
            data: { "Order": orderDocuments, "Cart": items },
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.show = show;
