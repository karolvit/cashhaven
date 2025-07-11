import { createContext, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

export const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [qrCodeBase64, setQrCodeBase64] = useState(null);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://celebreserver2.ddns.net:5238");

    ws.current.onopen = () => {
      console.log("Conexão WebSocket estabelecida");
    };

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const qr = data.qrCode;
        if (qr) {
          console.log("Imagem base64 recebida:", qr);
          setQrCodeBase64(qr);
        }
      } catch (e) {
        console.error("Erro ao parsear mensagem WebSocket:", e);
      }
    };

    ws.current.onerror = (error) => {
      console.error("Erro no WebSocket:", error);
    };

    ws.current.onclose = () => {
      console.log("Conexão WebSocket foi fechada");
    };

    return () => {
      ws.current.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ qrCodeBase64, ws: ws.current }}>
      {children}
    </WebSocketContext.Provider>
  );
};

WebSocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
