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
const nfc_service_1 = __importDefault(require("../service/nfc.service"));
const nfc = (0, express_1.Router)();
nfc.get("/danfe", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chave } = req.query;
    const chave_nfc = String(chave);
    const result = yield nfc_service_1.default.getDanfe(chave_nfc);
    res.status(result.success ? 200 : 500).json(result);
}));
nfc.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield nfc_service_1.default.allNFC();
    res.status(result.success ? 200 : 500).json(result);
}));
exports.default = nfc;
