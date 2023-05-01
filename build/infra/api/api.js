"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("../../routes/routes"));
const api = (0, express_1.default)();
api.use(express_1.default.json());
api.use(routes_1.default);
exports.default = api;
