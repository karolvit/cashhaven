"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.trueUid = trueUid;
exports.falseUid = falseUid;
const axios_1 = __importDefault(require("axios"));
const connection_1 = __importDefault(require("../database/connection"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
function trueUid(pagamento, client, produtosCliente) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            const [params] = yield connection_1.default.query("SELECT t1 as ck, t2 as csk, t3 as at, t4 as ats FROM company");
            const [ambiente_emissao] = yield connection_1.default.query("SELECT value as param FROM sys WHERE id = 9");
            const ambienteEmissao = parseInt(ambiente_emissao[0].param, 10);
            const t1 = params[0].ck;
            const t2 = params[0].csk;
            const t3 = params[0].at;
            const t4 = params[0].ats;
            const produtosPayload = [];
            for (const item of produtosCliente) {
                const [nome_produto] = yield connection_1.default.query("SELECT product FROM stock WHERE id = ?", [item.prodno]);
                const [imposto] = yield connection_1.default.query("SELECT ncm, cest FROM stock WHERE id = ?", [item.prodno]);
                const ncm = ((_a = imposto[0]) === null || _a === void 0 ? void 0 : _a.ncm) || "";
                const cest = ((_b = imposto[0]) === null || _b === void 0 ? void 0 : _b.cest) || "";
                const total_produto = item.unino * item.valor_unit;
                produtosPayload.push({
                    nome: ((_c = nome_produto[0]) === null || _c === void 0 ? void 0 : _c.product) || "Produto Desconhecido",
                    codigo: item.prodno,
                    ncm: ncm,
                    cest: cest,
                    quantidade: item.unino,
                    unidade: "UN",
                    peso: item.unino,
                    origem: 0,
                    subtotal: item.valor_unit,
                    total: total_produto.toFixed(2),
                    classe_imposto: "REF353907394",
                });
            }
            console.log(produtosPayload);
            const nfePayload = {
                ID: pagamento.pedido,
                operacao: 1,
                natureza_operacao: "Venda de mercadoria",
                modelo: 2,
                finalidade: 1,
                ambiente: ambienteEmissao,
                cliente: {
                    cpf: client.cpf,
                },
                produtos: produtosPayload,
                pedido: {
                    pagamento: 0,
                    presenca: 1,
                    modalidade_frete: 9,
                },
            };
            const headers = {
                "X-Consumer-Key": t1,
                "X-Consumer-Secret": t2,
                "X-Access-Token": t3,
                "X-Access-Token-Secret": t4,
            };
            const url = process.env.routeEmitir || '';
            const response = yield axios_1.default.post(url, nfePayload, { headers });
            const queryNFC = "INSERT INTO panel_nfc (pedido, uuid, status, motivo, nfe, serie, modelo, chave) VALUES (?,?,?,?,?,?,?,?)";
            yield connection_1.default.query(queryNFC, [
                pagamento.pedido,
                response.data.uuid,
                response.data.status,
                response.data.motivo,
                response.data.nfe,
                response.data.serie,
                response.data.modelo,
                response.data.chave
            ]);
        }
        catch (error) {
            console.error("Erro ao enviar nota fiscal:", error.message);
            console.error(error);
            throw new Error("Erro ao emitir NFe");
        }
    });
}
function falseUid(pagamento, client, produtosCliente) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            const [params] = yield connection_1.default.query("SELECT t1 as ck, t2 as csk, t3 as at, t4 as ats FROM company");
            const [ambiente_emissao] = yield connection_1.default.query("SELECT value as param FROM sys WHERE id = 9");
            const ambienteEmissao = parseInt(ambiente_emissao[0].param, 10);
            const t1 = params[0].ck;
            const t2 = params[0].csk;
            const t3 = params[0].at;
            const t4 = params[0].ats;
            const produtosPayload = [];
            for (const item of produtosCliente) {
                const [nome_produto] = yield connection_1.default.query("SELECT product FROM stock WHERE id = ?", [item.prodno]);
                const [imposto] = yield connection_1.default.query("SELECT ncm, cest FROM stock WHERE id = ?", [item.prodno]);
                const ncm = ((_a = imposto[0]) === null || _a === void 0 ? void 0 : _a.ncm) || "";
                const cest = ((_b = imposto[0]) === null || _b === void 0 ? void 0 : _b.cest) || "";
                const total_produto = item.unino * item.valor_unit;
                produtosPayload.push({
                    nome: ((_c = nome_produto[0]) === null || _c === void 0 ? void 0 : _c.product) || "Produto Desconhecido",
                    codigo: item.prodno,
                    ncm: ncm,
                    cest: cest,
                    quantidade: item.unino,
                    unidade: "UN",
                    peso: item.unino, // Ajuste o peso conforme sua necessidade
                    origem: 0,
                    subtotal: item.valor_unit,
                    total: total_produto.toFixed(2), // Garantir formato correto
                    classe_imposto: "REF353907394",
                });
            }
            console.log(produtosPayload);
            // Estrutura final com um único array de produtos
            const nfePayload = {
                ID: pagamento.pedido,
                operacao: 1,
                natureza_operacao: "Venda de mercadoria",
                modelo: 2,
                finalidade: 1,
                ambiente: ambienteEmissao,
                cliente: {
                    cpf: client.cpf,
                },
                produtos: produtosPayload, // Um único array com todos os produtos
                pedido: {
                    pagamento: 0,
                    presenca: 1,
                    modalidade_frete: 9,
                },
            };
            // Cabeçalhos para autenticação
            const headers = {
                "X-Consumer-Key": t1,
                "X-Consumer-Secret": t2,
                "X-Access-Token": t3,
                "X-Access-Token-Secret": t4,
            };
            // URL para emitir a NFe
            const url = process.env.routeEmitir || '';
            // Enviar a requisição para emitir a nota fiscal
            const response = yield axios_1.default.post(url, nfePayload, { headers });
            // Inserir dados no banco
            const queryNFC = "INSERT INTO panel_nfc (pedido, uuid, status, motivo, nfe, serie, modelo, chave) VALUES (?,?,?,?,?,?,?,?)";
            yield connection_1.default.query(queryNFC, [
                pagamento.pedido,
                response.data.uuid,
                response.data.status,
                response.data.motivo,
                response.data.nfe,
                response.data.serie,
                response.data.modelo,
                response.data.chave
            ]);
        }
        catch (error) {
            console.error("Erro ao enviar nota fiscal:", error.message);
            console.error(error);
            throw new Error("Erro ao emitir NFe");
        }
    });
}
function getDanfe(chave_nfc) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const danfe = process.env.serachDanfe;
            const response = yield axios_1.default.get(`${danfe}${chave_nfc}`);
            console.log(`${danfe}${chave_nfc}`);
            return {
                success: true,
                message: response.data,
            };
        }
        catch (error) {
            console.error(error);
            return {
                success: false,
                error: error,
            };
        }
    });
}
function allNFC() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "SELECT * FROM panel_nfc";
        const [result] = yield connection_1.default.query(query);
        return {
            success: true,
            message: result,
        };
    });
}
exports.default = {
    trueUid,
    falseUid,
    getDanfe,
    allNFC,
};
