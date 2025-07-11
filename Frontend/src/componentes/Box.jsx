import styled from "styled-components";
import PropTypes from "prop-types";

const BoxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 200px;
  padding: 20px;
  border: 5px solid ${(props) => props.theme.colors.primary};
  box-shadow: 10px 10px 4px 0px #00000040;
  height: 80px;
  border-radius: 15px;
  justify-content: space-around;
  background-color: #f9f9f9;

  h1 {
    font-size: 17px;
    text-align: center;
    line-height: 30px;
    font-weight: 800;
  }
  h2 {
    font-size: 30px;
  }
`;

const Box = ({ tituloBox, numeroBox }) => {
  return (
    <BoxContainer>
      <h1>{tituloBox}</h1>
      <h2>{numeroBox}</h2>
    </BoxContainer>
  );
};

Box.propTypes = {
  numeroBox: PropTypes.string,
  tituloBox: PropTypes.string.isRequired,
};

export default Box;
