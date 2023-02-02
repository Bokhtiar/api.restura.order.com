"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
dotenv_1.default.config();
const routes_1 = require("./routes");
const app_error_handeller_middleware_1 = require("./middlewares/app-error.handeller.middleware");
const api_key_middleware_1 = require("./middlewares/api-key.middleware");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use((0, helmet_1.default)());
exports.app.use((0, morgan_1.default)("dev"));
exports.app.use((0, compression_1.default)());
exports.app.use(body_parser_1.default.json());
exports.app.use(body_parser_1.default.urlencoded({ extended: true }));
exports.app.use(api_key_middleware_1.ValidXAPIKey);
/* Root route */
exports.app.get("/", (req, res, next) => {
    res.send("Welcome to transport service. 😛😛😛");
});
/* Integrate API routes */
exports.app.use("/api/v1", routes_1.router);
/* Handelling 404 route */
exports.app.use((req, res, next) => {
    res.status(404).json({
        status: false,
        errors: [{ field: "server", message: "Sorry, Route not found." }],
    });
});
/* Error handelling middleware registration */
exports.app.use(app_error_handeller_middleware_1.AppErrorHandeller);
