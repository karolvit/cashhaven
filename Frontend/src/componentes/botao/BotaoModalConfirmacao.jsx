import styled from "styled-components";

const BotaoModalConfirmacao = styled.button`
  cursor: pointer;
  color: #fff;
  border: none;
  border-radius: 10px;
  width: 80px;
  height: 35px;

  background-color: ${(props) =>
    props.variacao === "verde" ? "#6DA64D" : "#FF0000"};

  &:hover {
    opacity: 0.9;
    background-color: #261136;
  }
`;

export default BotaoModalConfirmacao;
