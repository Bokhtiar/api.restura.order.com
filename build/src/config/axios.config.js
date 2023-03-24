"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.axiosAuthRequest = exports.axiosProductRequest = void 0;
const axios_1 = __importDefault(require("axios"));
const ENDPOINT = process.env.PRODUCT_SERVICE_ENDPOINT || "http://localhost:4000/product";
exports.axiosProductRequest = axios_1.default.create({
    baseURL: ENDPOINT,
});
const AUTHENDPOINT = process.env.AUTH_SERVICE_ENDPOINT || "";
exports.axiosAuthRequest = axios_1.default.create({
    baseURL: AUTHENDPOINT,
});
