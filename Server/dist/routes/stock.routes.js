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
const stock_service_1 = __importDefault(require("../service/stock.service"));
const stock = (0, express_1.Router)();
stock.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield stock_service_1.default.allStock();
    res.status(result.success ? 200 : 500).json(result);
}));
stock.post("/insert", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { produto, compra, venda, saldo, fornecedor } = req.body;
    const result = yield stock_service_1.default.insertStock(produto, compra, venda, fornecedor, saldo);
    res.status(result.success ? 200 : 500).json(result);
}));
stock.post("/update/sd", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, saldo, fornecedor, compra } = req.body;
    const result = yield stock_service_1.default.insertSD(id, saldo, fornecedor, compra);
    res.status(result.success ? 200 : 500).json(result);
}));
stock.put("/update/product", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, venda, id } = req.body;
    const result = yield stock_service_1.default.modifyProduct(nome, venda, id);
    res.status(result.success ? 200 : 500).json(result);
}));
stock.delete("/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const pid = Number(id);
    const result = yield stock_service_1.default.deleteProduct(pid);
    res.status(result.success ? 200 : 500).json(result);
}));
stock.get("/serach/id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    const pid = Number(id);
    const result = yield stock_service_1.default.serachID(pid);
    res.status(result.success ? 200 : 500).json(result);
}));
stock.get("/serach/name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome } = req.query;
    const name = String(nome);
    const result = yield stock_service_1.default.serachName(name);
    res.status(result.success ? 200 : 500).json(result);
}));
exports.default = stock;
