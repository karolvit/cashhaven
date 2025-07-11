"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../config/authMiddleware");
const user_routes_1 = __importDefault(require("./user.routes"));
const param_routes_1 = __importDefault(require("./param.routes"));
const client_routes_1 = __importDefault(require("./client.routes"));
const stock_routes_1 = __importDefault(require("./stock.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const int_wpp_routes_1 = __importDefault(require("./int.wpp.routes"));
const sale_routes_1 = __importDefault(require("./sale.routes"));
const order_routes_1 = __importDefault(require("./order.routes"));
const table_routes_1 = __importDefault(require("./table.routes"));
const nfc_routes_1 = __importDefault(require("./nfc.routes"));
const cx_routes_1 = __importDefault(require("./cx.routes"));
const reports_routes_1 = __importDefault(require("./reports.routes"));
const company_routes_1 = __importDefault(require("./company.routes"));
const imp_routes_1 = __importDefault(require("./imp.routes"));
const routes = (0, express_1.Router)();
routes.use((req, res, next) => {
    if (req.path.startsWith("/auth")) {
        return next();
    }
    (0, authMiddleware_1.authenticateToken)(req, res, next);
});
routes.use("/user", user_routes_1.default);
routes.use("/param", param_routes_1.default);
routes.use("/client", client_routes_1.default);
routes.use("/stock", stock_routes_1.default);
routes.use("/auth", auth_routes_1.default);
routes.use("/int/wpp", int_wpp_routes_1.default);
routes.use("/sale", sale_routes_1.default);
routes.use("/order", order_routes_1.default);
routes.use("/table", table_routes_1.default);
routes.use("/panel", nfc_routes_1.default);
routes.use("/cx", cx_routes_1.default);
routes.use("/report", reports_routes_1.default);
routes.use("/company", company_routes_1.default);
routes.use("/imp", imp_routes_1.default);
exports.default = routes;
