"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_permission_middleware_1 = require("../middlewares/user.permission.middleware");
const cart_router_1 = require("./user/cart.router");
exports.router = (0, express_1.Router)();
exports.router.use("/cart", user_permission_middleware_1.userPermission, cart_router_1.cartRouter);
