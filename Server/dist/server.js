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
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const allRoutes_1 = __importDefault(require("./routes/allRoutes"));
const ws_1 = require("./websocket/ws");
const param_service_js_1 = __importDefault(require("./service/param.service.js"));
const { initializeVenom, stopVenom } = require('./utils/wpp/config');
dotenv.config();
const app = (0, express_1.default)();
const corsOptions = {
    origin: process.env.ALLOWED_ORIGINS || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use("/api", allRoutes_1.default);
const port = 5238;
let venomClient = null;
function monitorWhatsappServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { bit } = yield param_service_js_1.default.whatsappServer();
            if (bit === 1 && !venomClient) {
                console.log('Configuração validada, iniciando Venom Bot...');
                venomClient = yield initializeVenom();
                console.log("Venom bot iniciou");
            }
            else if (bit === 0 && venomClient) {
                console.log('Configuração não permite iniciar o Venom Bot, parando...');
                yield stopVenom(venomClient);
                venomClient = null;
            }
            else if (bit !== 1 && bit !== 0) {
                console.log('Valor de "bit" inválido no banco de dados');
            }
        }
        catch (error) {
            console.error('Erro ao validar configuração no banco de dados:', error);
        }
    });
}
setInterval(monitorWhatsappServer, 10000);
const server = app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
(0, ws_1.setupWebSocket)(server);
