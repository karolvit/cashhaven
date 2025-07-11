import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/allRoutes';
import { setupWebSocket } from './websocket/ws';
import serviceParam from './service/param.service.js';
const { initializeVenom, stopVenom } = require('./utils/wpp/config'); 

dotenv.config();

const app = express();

const corsOptions = {
    origin: process.env.ALLOWED_ORIGINS || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

app.use(express.json());
app.use("/api", routes);

const port = 5238;

let venomClient: any = null; 

async function monitorWhatsappServer() {
    try {
        const { bit } = await serviceParam.whatsappServer();

        if (bit === 1 && !venomClient) {
            console.log('Configuração validada, iniciando Venom Bot...');
            venomClient = await initializeVenom();
            console.log("Venom bot iniciou");
        } else if (bit === 0 && venomClient) {
            console.log('Configuração não permite iniciar o Venom Bot, parando...');
            await stopVenom(venomClient);
            venomClient = null;
        } else if (bit !== 1 && bit !== 0) {
            console.log('Valor de "bit" inválido no banco de dados');
        }
    } catch (error) {
        console.error('Erro ao validar configuração no banco de dados:', error);
    }
}

setInterval(monitorWhatsappServer, 10000);

const server = app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

setupWebSocket(server);
