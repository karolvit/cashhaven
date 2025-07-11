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
exports.allImp = allImp;
exports.primaryImp = primaryImp;
const connection_1 = __importDefault(require("../database/connection"));
function cupom(PedidoItem, hash, imp) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
function allImp() {
    return __awaiter(this, void 0, void 0, function* () {
        const [result] = yield connection_1.default.query(`
    SELECT 
      imp.id as id,
      imp.ip as ip,
      impm.ref as id_model ,
      imp.bit as status
    FROM
      imp
    LEFT JOIN
      imp_model impm ON imp.id_model = impm.id`);
        if (result == null || result == undefined) {
            return {
                success: false,
                error: "Nenhuma impressora cadastrada"
            };
        }
        return {
            success: true,
            message: result
        };
    });
}
;
function registerImp(ip, model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [result] = yield connection_1.default.query('INSERT INTO imp VALUES (null,?,?)', [ip, model]);
            return {
                success: true,
                message: 'Impressora cadastrada com sucesso'
            };
            if (!result) {
                return {
                    success: false,
                    error: "Impressora não cadastrada, por favor entrar em contato com administrador do sistema"
                };
            }
        }
        catch (error) {
            if (error.code === 'ER_DUP_ENTRY' && error.sqlMessage.includes(`for key 'imp.ip'`)) {
                return {
                    success: false,
                    error: "IP já cadastrado em outra impressora"
                };
            }
            return {
                success: false,
                error: error
            };
        }
    });
}
function allModels() {
    return __awaiter(this, void 0, void 0, function* () {
        const [result] = yield connection_1.default.query("SELECT * FROM imp_model");
        return {
            success: true,
            message: result
        };
    });
}
function primaryImp() {
    return __awaiter(this, void 0, void 0, function* () {
        const [rows] = yield connection_1.default.query("SELECT ip FROM imp WHERE bit = 1");
        if (rows.length !== 1) {
            return {
                success: false,
                message: rows.length === 0
                    ? "Nenhuma impressora primária cadastrada"
                    : "Mais de uma impressora primária cadastrada",
            };
        }
        return {
            success: true,
            ip: rows[0].ip,
        };
    });
}
exports.default = {
    registerImp,
    allImp,
    allModels,
    primaryImp
};
