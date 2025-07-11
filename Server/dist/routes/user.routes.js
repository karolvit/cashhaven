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
const user_service_1 = __importDefault(require("../service/user.service"));
const user = (0, express_1.Router)();
user.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.default.allUser();
        result.success
            ? res.status(200).json(result)
            : res.status(500).json(result);
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Erro interno" });
    }
}));
user.delete("/del/:uid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req.params;
        const id = parseInt(uid);
        const result = yield user_service_1.default.dellUser(id);
        res.status(result.success ? 200 : 500).json(result);
    }
    catch (error) { }
}));
user.put("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, cargo, adm, senha, user, id } = req.body;
    const result = yield user_service_1.default.editUser(nome, cargo, adm, senha, user, id);
    res.status(result.success ? 200 : 500).json(result);
}));
exports.default = user;
