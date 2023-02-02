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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidXAPIKey = void 0;
const helper_1 = require("../helper");
const api_key_json_1 = __importDefault(require("../json-data/api-key.json"));
/* API key checker middleware */
const ValidXAPIKey = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const key = req.headers.api_key;
        /* Header validation */
        if (!key) {
            return res.status(422).json(yield (0, helper_1.HttpErrorResponse)({
                status: false,
                errors: [
                    {
                        field: "api_key",
                        message: "API key not found.",
                    },
                ],
            }));
        }
        /* Match key with JSON keys */
        const isMatchedKey = yield api_key_json_1.default.find((item) => item.key === key);
        if (!isMatchedKey) {
            return res.status(404).json(yield (0, helper_1.HttpErrorResponse)({
                status: false,
                errors: [
                    {
                        field: "api_key",
                        message: "API key isn't correct.",
                    },
                ],
            }));
        }
        next();
    }
    catch (error) {
        if (error) {
            res.status(500).json(yield (0, helper_1.HttpErrorResponse)({
                status: false,
                errors: [
                    {
                        field: "server-error",
                        message: "Internal server error.",
                    },
                ],
            }));
        }
    }
});
exports.ValidXAPIKey = ValidXAPIKey;
