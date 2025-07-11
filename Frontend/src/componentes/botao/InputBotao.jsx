import PropTypes from "prop-types";
import styled from "styled-components";

const StiloInputButao = styled.input`
  min-width: 19%;
  border-radius: 10px;
  height: 50px;
  padding-left: 10px;
  border: none;
  color: #5f387a;
  font-size: 30px;
  font-weight: 800;
  cursor: pointer;
`;

const InputButao = ({
  type = "button",
  onClick,
  value,
  className = "",
  ...props
}) => {
  return (
    <StiloInputButao
      type={type}
      value={value}
      onClick={onClick}
      className={className}
      {...props}
    />
  );
};

InputButao.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default InputButao;
