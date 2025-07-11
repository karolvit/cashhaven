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
const ws_1 = require("../websocket/ws");
function sale(id, venda, inicio, fim) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const queryOldPrice = "SELECT p_venda as old_price FROM stock WHERE id = ?";
            const [resultOldPrice] = yield connection_1.default.query(queryOldPrice, [id]);
            if (resultOldPrice.length === 0) {
                return {
                    success: false,
                    error: ["Código do produto não encontrado"]
                };
            }
            const oldPrice = resultOldPrice[0].old_price;
            const queryInserSale = "INSERT INTO sale (prod, saleprice, oldprice, init, end) VALUES (?,?,?,?,?)";
            const [resultInsertPrice] = yield connection_1.default.query(queryInserSale, [id, venda, oldPrice, inicio, fim]);
            const SaleMessage = JSON.stringify({
                productId: id,
                salePrice: venda,
                oldPrice: oldPrice,
                startDate: inicio,
                endDate: fim,
            });
            (0, ws_1.sendSaleMessage)(SaleMessage);
            return {
                success: true,
                message: ["Promoção inserida com sucesso"]
            };
        }
        catch (error) {
            return {
                success: false,
                error: ["Erro ao inserir promoção, entre em contato com administrador do sistema"]
            };
        }
    });
}
exports.default = {
    sale
};
