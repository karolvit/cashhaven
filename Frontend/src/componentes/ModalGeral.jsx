import PropTypes from "prop-types";
import Modal from "react-modal";
import styled from "styled-components";

const ModalHeader = styled.div`
  background-color: #73287d;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;

  h2 {
    margin: 0;
    font-size: 20px;
  }

  button {
    background: transparent;
    border: none;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
  }
`;

const ModalGeral = ({
  isOpen,
  onRequestClose,
  title,
  children,
  customStyles,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          ...customStyles,
          padding: "20px",
          borderRadius: "10px",
        },
      }}
      ariaHideApp={false}
    >
      <ModalHeader>
        <h2>{title}</h2>
        <button onClick={onRequestClose}>&times;</button>
      </ModalHeader>
      <div>{children}</div>
    </Modal>
  );
};
ModalGeral.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
  customStyles: PropTypes.object,
};

ModalGeral.defaultProps = {
  title: "Título do Modal",
  customStyles: {},
};

export default ModalGeral;
