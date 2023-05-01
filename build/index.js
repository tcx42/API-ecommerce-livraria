"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const envConfig_1 = __importDefault(require("./config/envConfig"));
const api_1 = __importDefault(require("./infra/api/api"));
api_1.default.listen(envConfig_1.default.PORT, () => console.log("running"));
