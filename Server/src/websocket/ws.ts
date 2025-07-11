import WebSocket from 'ws';

declare global {
    var wsClients: WebSocket[] | any;
}

let clients: WebSocket[] = [];
let saleClients: WebSocket[] = [];

export const setupWebSocket = (server: any) => {
    const wss = new WebSocket.Server({ noServer: true }); 
    const saleWss = new WebSocket.Server({ noServer: true }); 

    server.on('upgrade', (request: any, socket: any, head: any) => {
        if (request.url === '/') {
            wss.handleUpgrade(request, socket, head, (ws) => {
                wss.emit('connection', ws, request);
            });
        } else if (request.url === '/sale') {
            saleWss.handleUpgrade(request, socket, head, (ws) => {
                saleWss.emit('connection', ws, request);
            });
        } else {
            socket.destroy(); 
        }
    });

    wss.on('connection', (ws) => {
        console.log('Novo cliente conectado via WebSocket na rota "/"');
      
        clients.push(ws);
        global.wsClients = clients;
      
        ws.send('Bem-vindo ao WebSocket na rota "/"!');
      
        let lastActiveTime = Date.now();
        const timeout = 60000; // 1 minuto de inatividade
    
        // Enviar ping a cada 30 segundos
        const pingInterval = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
                console.log('Enviando ping');
                ws.ping();
            }
        }, 30000);  // 30 segundos
    
        // Receber resposta do cliente ao ping
        ws.on('pong', () => {
            console.log('Pong recebido do cliente');
            lastActiveTime = Date.now();  // Atualiza o tempo de atividade
        });
    
        // Verifica inatividade e desconecta o cliente se não houver atividade
        const checkInactivity = setInterval(() => {
            if (Date.now() - lastActiveTime > timeout) {
                console.log('Desconectando cliente devido à inatividade');
                ws.close();
                clearInterval(checkInactivity);
            }
        }, 10000); // Verifica a inatividade a cada 10 segundos
    
        ws.on('message', (message) => {
            console.log('Mensagem recebida na rota "/":', message);
            clients.forEach(client => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
            ws.send(`Você disse: ${message}`);
            lastActiveTime = Date.now();  // Atualiza o tempo de atividade
        });
    
        ws.on('close', () => {
            clients = clients.filter(client => client !== ws);
            global.wsClients = clients;
            clearInterval(pingInterval);  // Limpar o intervalo de ping
            clearInterval(checkInactivity); // Limpar o intervalo de verificação de inatividade
            console.log('Conexão fechada');
        });
    });
    

    saleWss.on('connection', (ws) => {
        console.log('Novo cliente conectado via WebSocket na rota "/sale"');

        saleClients.push(ws);

        ws.send('Bem-vindo ao WebSocket na rota "/sale"!');

        ws.on('message', (message) => {
            console.log('Mensagem recebida na rota "/sale":', message);
            ws.send(`Rota "/sale" recebeu: ${message}`);
        });

        ws.on('close', () => {
            saleClients = saleClients.filter(client => client !== ws);
        });
    });
};

export const sendSaleMessage = (message: string) => {
    saleClients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ event: 'saleMessage', message }));
        }
    });
};
