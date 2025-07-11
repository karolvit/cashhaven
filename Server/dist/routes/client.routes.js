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
const client_service_1 = __importDefault(require("../service/client.service"));
const client = (0, express_1.Router)();
client.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield client_service_1.default.allClient();
    res.status(result.success ? 200 : 500).json(result);
}));
client.get("/serach", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cpf } = req.query;
    const uid = String(cpf);
    const result = yield client_service_1.default.serachClient(uid);
    res.status(result.success ? 200 : 500).json(result);
}));
client.get("/serachuid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cpf } = req.query;
    const uid = String(cpf);
    const result = yield client_service_1.default.serachClientById(uid);
    res.status(result.success ? 200 : 500).json(result);
}));
client.put("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, nome, telefone, cpf } = req.body;
    const result = yield client_service_1.default.updateClient(id, nome, telefone, cpf);
    res.status(result.success ? 200 : 500).json(result);
}));
client.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cpf, name, tel } = req.body;
    const result = yield client_service_1.default.clientCreate(cpf, name, tel);
    res.status(result.success ? 200 : 500).json(result);
}));
client.delete("/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const uid = Number(id);
    const result = yield client_service_1.default.deleteClient(uid);
    res.status(result.success ? 200 : 500).json(result);
}));
exports.default = client;
