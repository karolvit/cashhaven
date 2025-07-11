import PropTypes from "prop-types";
import Modal from "react-modal";
import SetaFechar from "./SetaFechar";
import styled from "styled-components";
import BotaoModalConfirmacao from "../componentes/botao/BotaoModalConfirmacao";
const ModalMensagem = styled.div`
  background-color: #712976;
  height: 35px;
  width: 100%;
  display: flex;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
  align-items: center;
  flex-direction: row-reverse;
  justify-content: space-between;
  gap: 30%;

  @media (max-width: 900px) {
    font-size: 10px;
  }
  h2 {
    font-size: 20px;
    color: #f3eef7;
    text-align: center;
    font-weight: 500;
    margin-left: 20px;

    @media (max-width: 900px) {
      font-size: 20px;
    }
  }
`;
const ContainerModal = styled.div`
  display: flex;
  flex-direction: column;
  h2 {
    text-align: center;
    margin-bottom: 5px;
    color: #712976;
    font-size: 23px;
    margin-top: 5px;
  }
`;
const BtnModal = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;

  button {
    cursor: pointer;
    color: #fff;
    border: none;
    border-radius: 10px;
    height: 35px;
    width: 110px;
  }
`;

const ConfirmModal = ({
  isOpen,
  onRequestClose,
  title,
  btn1,
  btn2,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={title}
      style={{
        content: {
          width: "50%",
          height: "120px",
          margin: "auto",
          padding: 0,
        },
      }}
    >
      <ModalMensagem>
        <SetaFechar Click={onRequestClose} />
        <h2>{title}</h2>
      </ModalMensagem>
      <ContainerModal>
        <h2>{message}</h2>
        <BtnModal>
          <BotaoModalConfirmacao variacao="verde" onClick={onConfirm}>
            {btn1}
          </BotaoModalConfirmacao>
          <BotaoModalConfirmacao variacao="vermelho" onClick={onCancel}>
            {btn2}
          </BotaoModalConfirmacao>
        </BtnModal>
      </ContainerModal>
    </Modal>
  );
};

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  btn1: PropTypes.string.isRequired,
  btn2: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmModal;
