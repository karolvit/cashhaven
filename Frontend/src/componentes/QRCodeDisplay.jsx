import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { WebSocketContext } from "../context/WebSocketContext";

const NotificationWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: white;
  padding: 10px;
  z-index: 9999;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0px 0px 10px #999;
  display: ${({ show }) => (show ? "block" : "none")};
  max-width: 300px;

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
`;

const QRCodeNotification = () => {
  const { qrCodeBase64 } = useContext(WebSocketContext);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (qrCodeBase64) {
      setShow(true);
      const timeout = setTimeout(() => {
        setShow(false);
      }, 50000);

      return () => clearTimeout(timeout);
    }
  }, [qrCodeBase64]);

  return (
    <NotificationWrapper show={show}>
      {qrCodeBase64 && (
        <img
          src={
            qrCodeBase64.startsWith("data:image")
              ? qrCodeBase64
              : `data:image/png;base64,${qrCodeBase64}`
          }
          alt="QR Code Recebido"
        />
      )}
    </NotificationWrapper>
  );
};

export default QRCodeNotification;
