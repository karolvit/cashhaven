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
const express_1 = require("express");
const cx_service_1 = __importDefault(require("../service/cx.service"));
const cx = (0, express_1.Router)();
cx.get("/validate", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_cx } = req.query;
    const cx = Number(user_cx);
    const result = yield cx_service_1.default.getCx(cx);
    res.status(result.success ? 200 : 500).json(result);
}));
cx.post("/open", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_cx, dinheiro } = req.body;
    const result = yield cx_service_1.default.openCx(user_cx, dinheiro);
    res.status(result.success ? 200 : 500).json(result);
}));
cx.post("/forceopen", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_cx, dinheiro } = req.body;
    const result = yield cx_service_1.default.openCx(user_cx, dinheiro);
    res.status(result.success ? 200 : 500).json(result);
}));
cx.post("/close", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_cx, credito, debito, pix, dinheiro } = req.body;
    const result = yield cx_service_1.default.closeCx(user_cx, credito, debito, pix, dinheiro);
    res.status(result.success ? 200 : 500).json(result);
}));
cx.post("/sangria", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_cx, sang, sd_old } = req.body;
    const result = yield cx_service_1.default.withdrawing(user_cx, sang, sd_old);
    res.status(result.success ? 200 : 500).json(result);
}));
exports.default = cx;
