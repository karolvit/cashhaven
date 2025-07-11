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
const connection_1 = __importDefault(require("../database/connection"));
function getCx(cx) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const [queryDiaAnterior] = yield connection_1.default.query("SELECT bit, DATE_FORMAT(date, '%d/%m/%Y') as date FROM cx WHERE date < CURDATE() ORDER BY date DESC LIMIT 1");
        const diaAnterior = (_b = (_a = queryDiaAnterior[0]) === null || _a === void 0 ? void 0 : _a.bit) !== null && _b !== void 0 ? _b : "dia anterior em aberto";
        const dataAnterior = (_d = (_c = queryDiaAnterior[0]) === null || _c === void 0 ? void 0 : _c.date) !== null && _d !== void 0 ? _d : "sem informações";
        const [diaAtual] = yield connection_1.default.query("SELECT bit FROM cx WHERE date = curdate()");
        const hoje = (_f = (_e = diaAtual[0]) === null || _e === void 0 ? void 0 : _e.bit) !== null && _f !== void 0 ? _f : "sem movimentação";
        if (cx == 1) {
            return {
                success: true,
                message: "Bem vindo, ADM",
            };
        }
        if (hoje === "sem movimentação") {
            if (diaAnterior === 1 && dataAnterior !== "sem informações") {
                return {
                    success: true,
                    message: `Caixa do dia ${dataAnterior} em aberto`,
                };
            }
            else {
                return {
                    success: true,
                    message: "Seja bem vindo ao CashHaven, realize a sua primeira abertura de caixa",
                    s0: 0
                };
            }
        }
        else {
            const [estadoAtualCaixa] = yield connection_1.default.query("SELECT bit, user_cx FROM cx WHERE date = curdate()");
            const ultimo_operador = (_g = estadoAtualCaixa[0]) === null || _g === void 0 ? void 0 : _g.user_cx;
            const ultimo_estado = (_h = estadoAtualCaixa[0]) === null || _h === void 0 ? void 0 : _h.bit;
            if (cx !== ultimo_operador && ultimo_estado === 1) {
                return {
                    success: false,
                    error: `Caixa de ${ultimo_operador} já se encontra em aberto, deseja fechar?`,
                    s0: 0
                };
            }
            else {
                return {
                    success: true,
                    message: "É necessário abrir o caixa para logar no sistema"
                };
            }
        }
        return {
            success: false,
            error: "Não foi possível validar o caixa",
        };
    });
}
function openCx(user_cx, dinheiro) {
    return __awaiter(this, void 0, void 0, function* () {
        if (user_cx == 1) {
            return {
                success: true,
                message: "Bem vindo, ADM"
            };
        }
        const [queryUltimoUsuario] = yield connection_1.default.query("SELECT bit FROM cx WHERE date < CURDATE() AND bit = 1 ORDER BY date DESC LIMIT 1");
        const ultimoOperador = queryUltimoUsuario.length > 0 ? queryUltimoUsuario[0].bit : 0;
        if (ultimoOperador == 0) {
            const query = "INSERT INTO cx (user_cx, credito, dinheiro, pix, debito, date, time, bit) VALUES (?, 0, ?, 0, 0, curdate(), curtime(), 1)";
            const [result] = yield connection_1.default.query(query, [user_cx, dinheiro]);
            return {
                success: true,
                message: "Caixa aberto com sucesso"
            };
        }
        if (ultimoOperador != user_cx) {
            return {
                success: false,
                error: "Caixa já está aberto por outro usuário"
            };
        }
        else {
            const query = "INSERT INTO cx (user_cx, credito, dinheiro, pix, debito, date, time, bit) VALUES (?, 0, ?, 0, 0, curdate(), curtime(), 1)";
            const [result] = yield connection_1.default.query(query, [user_cx, dinheiro]);
            return {
                success: true,
                message: "Caixa aberto com sucesso"
            };
        }
    });
}
function forceOpenCx(user_cx, dinheiro) {
    return __awaiter(this, void 0, void 0, function* () {
        const [queryUltimoCaixa] = yield connection_1.default.query("SELECT dinheiro, credito, debito, pix, user_cx FROM cx WHERE date < CURDATE() ORDER BY date DESC LIMIT 1 AND bit = 1");
        const ultimoOperador = queryUltimoCaixa[0].user_cx;
        const ultimoSaldoDinheiro = queryUltimoCaixa[0].dinheiro;
        const ultimoSaldoCredito = queryUltimoCaixa[0].credito;
        const ultimoSaldoDebito = queryUltimoCaixa[0].debito;
        const ultimoSaldoPix = queryUltimoCaixa[0].pix;
        const query = "INSERT INTO cx (user_cx, credito, dinheiro, pix, debito, date, time, bit) VALUES (?, ?, ?, ?, ?, curdate(), curtime(), 0)";
        const [result] = yield connection_1.default.query(query, [ultimoOperador, ultimoSaldoCredito, ultimoSaldoDinheiro, ultimoSaldoPix, ultimoSaldoDebito]);
        const newcx = "INSERT INTO cx (user_cx, credito, dinheiro, pix, debito, date, time, bit) VALUES (?, 0, ?, 0, 0, curdate(), curtime(), 1)";
        const [resultNewCx] = yield connection_1.default.query(newcx, [user_cx, dinheiro]);
        return {
            success: true,
            message: "Caixa aberto com sucesso"
        };
    });
}
function closeCx(user_cx, credito, debito, pix, dinheiro) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "INSERT INTO cx (user_cx, credito, debito, pix, dinheiro, date, time, bit) VALUES (?,?,?,?,?,curdate(),curtime(),0);";
        const [result] = yield connection_1.default.query(query, [user_cx, credito, debito, pix, dinheiro]);
        return {
            success: true,
            message: "Caixa fechado com sucesso"
        };
    });
}
function withdrawing(user_cx, sang, sd_old) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "INSERT INTO withdrawing (user_cx, sang, sd_old, sd_new, date, time) VALUES (?,?,?,?,curdate(), curtime())";
        const sd_new = sd_old - sang;
        if (sang > sd_old) {
            return {
                success: false,
                error: "Saldo insuficiente"
            };
        }
        const [result] = yield connection_1.default.query(query, [user_cx, sang, sd_old, sd_new]);
        return {
            success: true,
            message: "Sangria realizada com sucesso"
        };
    });
}
exports.default = {
    getCx,
    openCx,
    forceOpenCx,
    closeCx,
    withdrawing
};
