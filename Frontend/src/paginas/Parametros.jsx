import styled, { createGlobalStyle } from "styled-components";
import { useState } from "react";
import Modal from "react-modal";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const Container = styled.div`
  padding: 2rem;
  font-family: Arial, Helvetica, sans-serif;
  width: 1000px;
`;

const Tabs = styled.div`
  display: flex;
  margin-bottom: 20px;
  
`;

const Tab = styled.button`
  padding: 10px 90px;
  font-weight: bold;
  color: #73287d;
  background: ${({ active }) => (active ? "#f3eef7" : "transparent")};
  border: 2px solid #73287d;
  border-bottom: ${({ active }) => (active ? "none" : "2px solid #73287d")};
  cursor: pointer;
  border-radius: 10px 10px 0 0;
`;

const Form = styled.div`
  background: #fff;
  padding: 2rem;
  border: 2px solid #73287d;
  border-radius: 0 0 10px 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  input {
    padding: 0.5rem;
    border: 1px solid #73287d;
    border-radius: 8px;
    font-size: 16px;
    color: #73287d;
  }

  label {
    font-weight: bold;
    color: #73287d;
  }
`;

const Linha = styled.div`
  display: flex;
  flex-direction: column;
`;

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Parametros = () => {
  const [abaAtual, setAbaAtual] = useState("empresa");
  const [vendaManual, setVendaManual] = useState(false);

  return (
    <>
      <GlobalStyle />
      <Container>
        <h2 style={{ color: "#73287d", marginBottom: "20px" }}>PARÂMETROS</h2>
        <Tabs>
          <Tab active={abaAtual === "empresa"} onClick={() => setAbaAtual("empresa")}>
            Configuração Empresa
          </Tab>
          <Tab active={abaAtual === "pdv"} onClick={() => setAbaAtual("pdv")}>
            Configuração PDV
          </Tab>
          <Tab active={abaAtual === "impressora"} onClick={() => setAbaAtual("impressora")}>
            Configuração Impressora
          </Tab>
        </Tabs>

        {abaAtual === "empresa" && (
          <Form>
            <Linha>
              <label>ID</label>
              <input defaultValue="1"  disabled/>
            </Linha>
            <Linha>
              <label>Razão Social</label>
              <input defaultValue="AÇAÍ CONXEGO" />
            </Linha>
            <Linha>
              <label>CNPJ</label>
              <input defaultValue="25181960000126" />
            </Linha>
            <Linha>
              <label>IE</label>
              <input defaultValue="202823201" />
            </Linha>
            <Linha>
              <label>Bairro</label>
              <input defaultValue="BOCA DO RIO" />
            </Linha>
            <Linha>
              <label>Endereço</label>
              <input defaultValue="RUA ORLANDO MOSCOSO 166" />
            </Linha>
            <Linha>
              <label>Cidade</label>
              <input defaultValue="SALVADOR" />
            </Linha>
            <Linha>
              <label>Estado</label>
              <input defaultValue="BA" />
            </Linha>
          </Form>
        )}

        {abaAtual === "pdv" && (
          <Form>
            <Linha>
              <label>Saldo mínimo para resgate</label>
              <input defaultValue="3.00" />
            </Linha>
            <Linha>
              <label>Percentual cashback</label>
              <input defaultValue="3.00" />
            </Linha>
            <Linha>
              <label>Desativar/Ativar venda manual</label>
              <SwitchContainer>
                <input
                  type="checkbox"
                  checked={vendaManual}
                  onChange={() => setVendaManual(!vendaManual)}
                />
                <span>{vendaManual ? "Ativo" : "Inativo"}</span>
              </SwitchContainer>
            </Linha>
          </Form>
        )}

        {abaAtual === "impressora" && (
          <Form>
            <Linha>
              <label>ID</label>
              <input defaultValue="1" disabled/>
            </Linha>
            <Linha>
              <label>IP</label>
              <input defaultValue="192.168.10.16" disabled/>
            </Linha>
            <Linha>
              <label>Modelo</label>
              <input defaultValue="ELGIN I9 (IP)" disabled/>
            </Linha>
          </Form>
        )}
      </Container>
    </>
  );
};

export default Parametros;
