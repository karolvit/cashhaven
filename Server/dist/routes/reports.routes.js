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
const reports_service_1 = __importDefault(require("../service/reports.service"));
const reports = (0, express_1.Router)();
reports.get("/stock", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield reports_service_1.default.stockAlert();
    res.status(result.success ? 200 : 500).json(result);
}));
reports.get("/vendas", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield reports_service_1.default.vendasDia();
    res.status(result.success ? 200 : 500).json(result);
}));
reports.get("/sale", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { days } = req.query;
    const day = Number(days);
    const result = yield reports_service_1.default.saleResum(day);
    res.status(result.success ? 200 : 500).json(result);
}));
reports.get("/diario", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_cx } = req.query;
    const opcx = Number(user_cx);
    const result = yield reports_service_1.default.relDiario(opcx);
    res.status(result.success ? 200 : 500).json(result);
}));
reports.get("/ticket", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data_inicial, data_final } = req.query;
    const date_init = String(data_inicial);
    const date_finnaly = String(data_final);
    const result = yield reports_service_1.default.ticketMedio(date_init, date_finnaly);
    res.status(result.success ? 200 : 500).json(result);
}));
reports.get("/precificacao", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield reports_service_1.default.acaiXcomplementos();
    res.status(result.success ? 200 : 500).json(result);
}));
exports.default = reports;
