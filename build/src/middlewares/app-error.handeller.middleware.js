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
exports.AppErrorHandeller = void 0;
const helper_1 = require("../helper");
const AppErrorHandeller = (error, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (error.status === 404) {
        return res.status(404).json(yield (0, helper_1.HttpErrorResponse)({
            status: false,
            errors: [
                {
                    field: "not-found",
                    message: error.message,
                },
            ],
        }));
    }
    if (error.status === 400) {
        return res.status(400).json(yield (0, helper_1.HttpErrorResponse)({
            status: false,
            errors: [
                {
                    field: "bad-request",
                    message: "Bad request server denied.",
                },
            ],
        }));
    }
    if (error.status === 401) {
        return res.status(401).json(yield (0, helper_1.HttpErrorResponse)({
            status: false,
            errors: [
                {
                    field: "permission",
                    message: "You have no permission to access.",
                },
            ],
        }));
    }
    return res.status(500).json(yield (0, helper_1.HttpErrorResponse)({
        status: false,
        errors: [
            {
                field: "server-error",
                message: "Internal server error.",
            },
        ],
    }));
});
exports.AppErrorHandeller = AppErrorHandeller;
