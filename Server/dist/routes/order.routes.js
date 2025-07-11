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
const order_service_1 = __importDefault(require("../service/order.service"));
const order = (0, express_1.Router)();
order.get("/new", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.default.orderNext();
    res.status(result.success ? 200 : 500).json(result);
}));
order.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        const result = yield order_service_1.default.createOrder(orderData);
        if (result) {
            res.status(result.success ? 200 : 500).json(result);
        }
        else {
            res.status(500).json({
                success: false,
                error: "Resultado indefinido",
                details: "O resultado da criação do pedido é indefinido.",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: "Erro interno no servidor",
            details: error.message,
        });
    }
}));
order.post("/panel", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uuid, status, motivo, nfe, serie, modelo, recibo, chave } = req.body;
    const result = yield order_service_1.default.panelNFC(uuid, status, motivo, nfe, serie, modelo, recibo, chave);
    res.status(result.success ? 201 : 500).json(result);
}));
exports.default = order;
