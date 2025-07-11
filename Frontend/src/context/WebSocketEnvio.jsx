let socket = null;

export const conectarSocket = () => {
  if (!socket || socket.readyState === WebSocket.CLOSED) {
    socket = new WebSocket("ws://celebreserver2.ddns.net:5238");

    socket.onopen = () => {
      console.log("WebSocket conectado");
    };

    socket.onclose = () => {
      console.log("WebSocket desconectado");
    };

    socket.onerror = (err) => {
      console.error("Erro no WebSocket:", err);
    };
  }
};

export const enviarMensagem = (mensagem) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(mensagem));
    console.log("Mensagem enviada:", mensagem);
  } else {
    console.warn("WebSocket não está pronto. Tentando reconectar...");
    conectarSocket();
    socket.addEventListener("open", () => {
      socket.send(JSON.stringify(mensagem));
    });
  }
};

export const fecharSocket = () => {
  if (socket) {
    socket.close();
    socket = null;
  }
};
