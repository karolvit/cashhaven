"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVenomError = exports.getVenomClient = void 0;
exports.initializeVenom = initializeVenom;
const ws_1 = require("ws");
const venom = require('venom-bot');
let venomClient = null;
let venomError = null;
function initializeVenom() {
    return new Promise((resolve, reject) => {
        venom
            .create({
            session: "tocaacai",
            multidevice: true,
            headless: true,
            launch: {
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
                timeout: 60000,
            }
        }, (base64Qr, asciiQr) => {
            global.qrCode = base64Qr;
            if (global.wsClients && global.wsClients.length > 0) {
                global.wsClients.forEach((client) => {
                    if (client.readyState === ws_1.WebSocket.OPEN) {
                        client.send(JSON.stringify({ event: 'qrCodeGenerated', qrCode: base64Qr }));
                    }
                    else {
                        console.log("Cliente WebSocket não está aberto.");
                    }
                });
            }
            else {
                console.log("Nenhum cliente WebSocket conectado.");
            }
        }, (statusSession) => {
            if (statusSession === 'isLogged' || statusSession === 'qrReadSuccess') {
                global.sucesso = (statusSession === 'isLogged' || statusSession === 'qrReadSuccess');
                if (global.wsClients) {
                    global.wsClients.forEach((client) => {
                        if (client.readyState === ws_1.WebSocket.OPEN) {
                            client.send(JSON.stringify({
                                event: 'qrCodeStatus',
                                status: 'ok',
                                message: 'QR Code lido com sucesso e a sessão foi iniciada.',
                            }));
                        }
                    });
                }
            }
        })
            .then((client) => {
            venomClient = client;
            resolve(client);
        })
            .catch((error) => {
            venomError = error;
            reject(error);
        });
    });
}
const getVenomClient = () => venomClient;
exports.getVenomClient = getVenomClient;
const getVenomError = () => venomError;
exports.getVenomError = getVenomError;
