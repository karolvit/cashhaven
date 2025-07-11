import express, { Request, Response } from 'express';
import { WebSocket } from 'ws';
const escpos = require('escpos');
const Network = require('escpos-network');
const ping = require('ping');

const app = express();
app.use(express.json());

interface PedidoItem {
  codigo: string;
  unidade: string;
  descricao: string;
  valor: string;
  data: string;
  hora: string;
}

const cxhas = "f2c3e4bb7b5577592d4b0c3b0fdd774084f2b1c53e2086b99bffcf74ad44d2e5f3c0a9fd3753209a967b4b3f913b6f0d81fa7509e2c62e3e7c577c28c8e084021d7ff722e6d953c535ffbc9a758c41b63d8d3ad3de89619d57c2251b91a5e4664a49a53d7e9d5e5331e5f6f3baf6c9b455ae37c1b6a56c";

let ws: WebSocket;
let pingInterval: NodeJS.Timeout;
const processedPedidos = new Set<string>();

function connectWebSocket() {
  console.log('🧩 Chamando connectWebSocket...');

  if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
    console.log('🔁 WebSocket já está conectado ou conectando.');
    return;
  }

  if (ws) {
    ws.removeAllListeners();
  }

  ws = new WebSocket('ws://celebreserver2.ddns.net:5238/');

  ws.on('open', () => {
    console.log('✅ Conectado ao WebSocket.');

    pingInterval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'ping' }));
      }
    }, 25000);
  });

  ws.on('message', (data: string) => {
    try {
      const message = JSON.parse(data);

      if (message.type !== 'cupom' || message.hash !== cxhas) {
        console.log('⚠️ Mensagem ignorada: tipo diferente de "cupom" ou hash inválida.');
        return;
      }

      const pedidoId = message.ped;

      if (processedPedidos.has(pedidoId)) {
        console.log(`⚠️ Pedido ${pedidoId} já foi impresso recentemente. Ignorando...`);
        return;
      }

      processedPedidos.add(pedidoId);
      setTimeout(() => processedPedidos.delete(pedidoId), 60000);

      const pedidoArray: PedidoItem[] = message.pedido;
      const printerIp = `${message.imp}`;
      const printerPort = 9100;

      ping.sys.probe(printerIp, (isAlive: boolean) => {
        if (!isAlive) {
          console.log(`❌ Impressora ${printerIp} está inacessível. Cancelando impressão.`);
          return;
        }

        const device = new Network(printerIp, printerPort);
        const printer = new escpos.Printer(device, { encoding: 'windows-1252' });

        device.open(() => {
          printer
            .size(1, 1)
            .text("         NFC")
            .text("\n")
            .size(0.09, 0.09)
            .text("TOCA DO ACAI")
            .size(0.01, 0.01)
            .text("RUA JAYME VIEIRA LIMA, N° 45E - PAU DA LIMA")
            .size(0.09, 0.09)
            .text("CNPJ: 22.260.208/0001-82")
            .text(`                                     ${message.data}`)
            .text(`                                     ${message.hora}`)
            .text(`                                     PED: ${pedidoId}`)
            .text("------------------------------------------------")
            .size(0.05, 0.05)
            .text(" COD     UNI      DESC              VALOR");

          const codMaxLength = 2;
          const uniMaxLength = 4;
          const descricaoMaxLength = 15;
          const valorMaxLength = 6;

          pedidoArray.forEach(item => {
            const codigoFormatado = item.codigo.padStart(codMaxLength, ' ');
            const unidadeFormatada = item.unidade.padStart(uniMaxLength, ' ');
            const descricaoFormatada = item.descricao.length > descricaoMaxLength
              ? item.descricao.substring(0, descricaoMaxLength)
              : item.descricao.padEnd(descricaoMaxLength, ' ');
            const valorFormatado = item.valor.replace('R$ ', '').replace(',', '.');
            const valorFormatadoComEspacos = `R$ ${parseFloat(valorFormatado).toFixed(2)}`.padStart(valorMaxLength, ' ');

            printer.text(` ${codigoFormatado}    ${unidadeFormatada}      ${descricaoFormatada}    ${valorFormatadoComEspacos}`);
          });

          const total = pedidoArray.reduce((total, item) => {
            const valorFormatado = item.valor.replace('R$ ', '').replace(',', '.');
            return total + parseFloat(valorFormatado);
          }, 0);

          printer
            .text("------------------------------------------------")
            .size(0.1, 0.1)
            .text(`                               TOTAL: R$ ${total.toFixed(2)}`)
            .text("------------------------------------------------")
            .text("\n\n\n")
            .size(0.0001, 0.0001)
            .text("    desenvolvido por celebreprojetos.com.br")
            .text("\n\n\n")
            .cut()
            .close();

          console.log(`✅ Pedido ${pedidoId} impresso com sucesso!`);
        });
      });

    } catch (error) {
      console.log(`❌ Erro ao processar mensagem: ${error}`);
    }
  });

  ws.on('close', (code) => {
    clearInterval(pingInterval);
    console.log(`❌ WebSocket desconectado (código ${code}). Tentando reconectar...`);
    setTimeout(connectWebSocket, 1000);
  });

  ws.on('error', (error) => {
    clearInterval(pingInterval);
    console.log(`⚠️ Erro no WebSocket: ${error}. Tentando reconectar...`);
    setTimeout(connectWebSocket, 1000);
  });
}

connectWebSocket();

const port = 3000;
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
