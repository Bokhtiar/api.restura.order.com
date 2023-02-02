"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const db_config_1 = require("./src/config/db.config");
const app_1 = require("./src/app");
dotenv_1.default.config();
const port = process.env.PORT;
app_1.app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app_1.app.listen(port, () => {
    (0, db_config_1.dbConnection)();
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
