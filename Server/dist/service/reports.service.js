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
function relDiario(opcx) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        const [sangria] = yield connection_1.default.query("SELECT sd_new FROM withdrawing WHERE user_cx = ? AND date = curdate()", [opcx]);
        const Sangria = sangria[0].sd_new;
        const [valorRetirada] = yield connection_1.default.query("SELECT sang FROM withdrawing WHERE user_cx = ? AND date = curdate()", [opcx]);
        const retiradaSangria = (_a = valorRetirada[0].sang) !== null && _a !== void 0 ? _a : "0";
        const [queryDebito] = yield connection_1.default.query(`
       SELECT sum(pay.valor_recebido) as debito 
       FROM purchases
       INNER JOIN pay ON pay.pedido = purchases.pedido
       WHERE pay.tipo = 3 and purchases.date = curdate() and purchases.op = ?
        `, [opcx]);
        const [queryCredito] = yield connection_1.default.query(`
       SELECT sum(pay.valor_recebido) as debito 
       FROM purchases
       INNER JOIN pay ON pay.pedido = purchases.pedido
       WHERE pay.tipo = 2 and purchases.date = curdate() and purchases.op = ?
        `, [opcx]);
        const [queryPix] = yield connection_1.default.query(`
       SELECT sum(pay.valor_recebido) as debito 
       FROM purchases
       INNER JOIN pay ON pay.pedido = purchases.pedido
       WHERE pay.tipo = 0 and purchases.date = curdate() and purchases.op = ?
        `, [opcx]);
        const [queryDinheiro] = yield connection_1.default.query(`
       SELECT sum(pay.valor_recebido) - sum(pay.bit) as dinheiro 
       FROM purchases
       INNER JOIN pay ON pay.pedido = purchases.pedido
       WHERE pay.tipo = 1 and purchases.date = curdate() and purchases.op = ?
        `, [opcx]);
        const [saldo_inicial] = yield connection_1.default.query(`
        SELECT dinheiro 
        FROM cx 
        WHERE date = CURDATE() AND bit = 1 AND user_cx = ?;
        `, [opcx]);
        const saldoInicial = parseFloat((_c = (_b = saldo_inicial[0]) === null || _b === void 0 ? void 0 : _b.dinheiro) !== null && _c !== void 0 ? _c : "0");
        const debito = parseFloat((_e = (_d = queryDebito[0]) === null || _d === void 0 ? void 0 : _d.debito) !== null && _e !== void 0 ? _e : "0");
        const credito = parseFloat((_g = (_f = queryCredito[0]) === null || _f === void 0 ? void 0 : _f.credito) !== null && _g !== void 0 ? _g : "0");
        const pix = parseFloat((_j = (_h = queryPix[0]) === null || _h === void 0 ? void 0 : _h.pix) !== null && _j !== void 0 ? _j : "0");
        const dinheiro = parseFloat((_l = (_k = queryDinheiro[0]) === null || _k === void 0 ? void 0 : _k.dinheiro) !== null && _l !== void 0 ? _l : "0");
        const total_vendas = debito + credito + pix + dinheiro;
        let total_caixa;
        if (Sangria > 0) {
            total_caixa = Sangria;
        }
        else {
            total_caixa = saldoInicial + dinheiro;
        }
        return {
            success: true,
            abertura: saldoInicial.toFixed(2),
            vendas_pix: pix.toFixed(2),
            vendas_credito: credito.toFixed(2),
            vendas_debito: debito.toFixed(2),
            vendas_dinheiro: dinheiro.toFixed(2),
            vendas_total: total_vendas.toFixed(2),
            total_caixa: total_caixa,
            sangria: retiradaSangria
        };
    });
}
function stockAlert() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [paramStock] = yield connection_1.default.query("SELECT value, bit FROM sys WHERE id = 5");
            if (!paramStock || paramStock.length === 0) {
                return {
                    success: false,
                    error: "Erro ao buscar parâmetro de estoque"
                };
            }
            const atvParamStock = paramStock[0].bit;
            const valueParamStock = paramStock[0].value;
            if (atvParamStock == 1) {
                const [stock_alert] = yield connection_1.default.query("SELECT COUNT(id) AS estoque FROM stock WHERE sd <= ?", [valueParamStock]);
                if (stock_alert.length == 0) {
                    return {
                        success: true,
                        message: 0
                    };
                }
                return {
                    success: true,
                    message: stock_alert
                };
            }
            else {
                return {
                    success: false,
                    error: "Parâmetro para alerta de estoque está desativado"
                };
            }
        }
        catch (error) {
            console.error(error);
            return {
                success: false,
                error: error
            };
        }
    });
}
function vendasDia() {
    return __awaiter(this, void 0, void 0, function* () {
        const [result] = yield connection_1.default.query("SELECT COUNT(pedido) AS venda_do_dia FROM purchases WHERE date = curdate()");
        const vendasDia = result[0].venda_do_dia || "0";
        return {
            success: true,
            vendas: vendasDia
        };
    });
}
function saleResum(day) {
    return __awaiter(this, void 0, void 0, function* () {
        const [resumoVendas] = yield connection_1.default.query(`
        SELECT 
            COUNT(pedido) AS vendas, 
            DATE_FORMAT(date, "%d/%m") AS data 
        FROM 
            purchases 
        WHERE 
            date >= CURDATE() - INTERVAL ? DAY 
        GROUP BY 
            DATE_FORMAT(date, "%d/%m")
        ORDER BY 
            DATE_FORMAT(date, "%d/%m");
`, [day]);
        return {
            success: true,
            message: resumoVendas
        };
    });
}
function ticketMedio(date_init, date_finnaly) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `
        SELECT 
    DATE_FORMAT(purchases.date, "%d/%m/%Y") AS dia,
    SUM(pay.valor_pedido) AS faturamento,
    COUNT(purchases.pedido) AS vendas,
    (SUM(pay.valor_pedido) / COUNT(purchases.pedido)) AS ticket_medio
    FROM purchases
    INNER JOIN pay ON purchases.pedido = pay.pedido
    WHERE purchases.date BETWEEN ? AND ?
    GROUP BY purchases.date
    ORDER BY purchases.date;
    `;
        const [result] = yield connection_1.default.query(query, [date_init, date_finnaly]);
        return {
            success: true,
            dados: result
        };
    });
}
function acaiXcomplementos() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const [precoBaseAcai] = yield connection_1.default.query("SELECT p_venda FROM stock WHERE id = 1");
        const preco_base = parseFloat((_a = precoBaseAcai[0]) === null || _a === void 0 ? void 0 : _a.p_venda) || 0;
        if (!preco_base) {
            return {
                success: false,
                message: "Preço base do açaí não encontrado."
            };
        }
        const [stock] = yield connection_1.default.query("SELECT stock.product as produto, nsd.new_sd, nsd.p_custo, DATE_FORMAT(nsd.date, '%d/%m/%Y') as data_compra, " +
            "CASE WHEN nsd.type = 1 THEN 'KG' WHEN nsd.type = 2 THEN 'UN' ELSE 'Outro' END as tipo " +
            "FROM nsd INNER JOIN stock ON stock.id = nsd.productid WHERE nsd.type = 1");
        if (stock.length === 0) {
            return {
                success: false,
                message: "Nenhum item de estoque encontrado com type = 1."
            };
        }
        const produtos = stock.map(produto => {
            const sd = parseFloat(produto.new_sd) || 1;
            const p_custo = parseFloat(produto.p_custo) || 0;
            const preco_quilo = parseFloat((p_custo / sd).toFixed(2));
            const ganho_valor = parseFloat((preco_base - preco_quilo).toFixed(2));
            const ganho_porcentagem = preco_quilo !== 0 ? parseFloat(((ganho_valor / preco_quilo) * 100).toFixed(2)) : 0;
            return Object.assign(Object.assign({}, produto), { preco_quilo,
                ganho_valor,
                ganho_porcentagem });
        });
        return {
            success: true,
            produtos: produtos,
            preco_base: preco_base
        };
    });
}
exports.default = {
    stockAlert,
    vendasDia,
    saleResum,
    relDiario,
    ticketMedio,
    acaiXcomplementos
};
