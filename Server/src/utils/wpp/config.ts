import { WebSocket } from 'ws'; 

declare global {
  var qrCode: any | null;
  var wsClients: WebSocket[] | null | any;
  var sucesso: any
  var client: any
}

const venom = require('venom-bot');

let venomClient: any | undefined= null;
let venomError: any = null;

export function initializeVenom() {
  return new Promise((resolve, reject) => {
    venom
      .create(
        {
          session: "tocaacai",
          multidevice: true,
          headless: true,
          launch: {
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            timeout: 60000,
          }
        },
        (base64Qr: any, asciiQr: any) => {
          global.qrCode = base64Qr;

          if (global.wsClients && global.wsClients.length > 0) {
            global.wsClients.forEach((client: any) => {
              if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ event: 'qrCodeGenerated', qrCode: base64Qr }));
              } else {
                console.log("Cliente WebSocket não está aberto.");
              }
            });
          } else {
            console.log("Nenhum cliente WebSocket conectado.");
          }
        },
        (statusSession: any) => {
          if (statusSession === 'isLogged' || statusSession === 'qrReadSuccess') {
            global.sucesso = (statusSession === 'isLogged' || statusSession === 'qrReadSuccess');
            if (global.wsClients) {
              global.wsClients.forEach((client: any) => {
                if (client.readyState === WebSocket.OPEN) {
                  client.send(JSON.stringify({
                    event: 'qrCodeStatus',
                    status: 'ok',
                    message: 'QR Code lido com sucesso e a sessão foi iniciada.',
                  }));
                }
              });
            }
          }
        }
      )
      .then((client: any) => {
        venomClient = client;
        resolve(client);
      })
      .catch((error: any) => {
        venomError = error;
        reject(error);
      });
  });
}

export const getVenomClient = (): typeof venomClient => venomClient;
export const getVenomError = (): typeof venomError => venomError;