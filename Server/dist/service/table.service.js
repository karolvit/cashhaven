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
function allTables() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "SELECT * FROM tables";
        const [result] = yield connection_1.default.query(query);
        console.log(result);
        return {
            success: true,
            message: result
        };
    });
}
function insertTable(id, referencia) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = "INSERT INTO tables (id, referencia, t1, t2) VALUES (?, ?, 1, 0)";
            const [result] = yield connection_1.default.query(query, [id, referencia]);
            return {
                success: true,
                message: ["Mesa cadastrada com sucesso"]
            };
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
function deletTable(uid) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "DELETE FROM tables WHERE id = ?";
        const [result] = yield connection_1.default.query(query, [uid]);
        return {
            success: true,
            message: ["Mesa excluída com sucesso"]
        };
    });
}
function insertTablePed(pedidos) {
    return __awaiter(this, void 0, void 0, function* () {
        let connection;
        try {
            connection = yield connection_1.default.getConnection();
            yield connection.beginTransaction();
            const query = `INSERT INTO tableped (tableid, id_client, prodno, unino, valor_unit, valor_total, bit) 
                       VALUES (?, ?, ?, ?, ?, ?, ?)`;
            for (const pedido of pedidos) {
                const { tableid, uid, prodno, unino, valor_unit, valor_total, bit } = pedido;
                yield connection.query(query, [tableid, uid, prodno, unino, valor_unit, valor_total, bit]);
                if (bit == 1) {
                    const query = "UPDATE tables SET t2 = 1 WHERE id = ?";
                    const [result] = yield connection_1.default.query(query, [tableid]);
                }
            }
            yield connection.commit();
            return {
                success: true,
                message: 'Pedidos inseridos com sucesso.'
            };
        }
        catch (error) {
            if (connection) {
                yield connection.rollback();
            }
            return {
                success: false,
                error: error
            };
        }
        finally {
            if (connection) {
                connection.release();
            }
        }
    });
}
function pedTable() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "SELECT tableid, id_client, stock.product, prodno, unino, valor_unit, valor_total, bit FROM tableped INNER JOIN stock ON stock.id = tableped.prodno WHERE bit = 1";
        const [result] = yield connection_1.default.query(query);
        return {
            success: true,
            message: result
        };
    });
}
exports.default = {
    allTables,
    insertTable,
    deletTable,
    insertTablePed,
    pedTable
};
