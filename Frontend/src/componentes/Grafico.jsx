import Box from "./Box";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";
import { useEffect, useState } from "react";
import apiAcai from "../axios/config";

const ContainerBox = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
`;

const ContainerGrafico = styled.div`
  margin-top: 50px;
  width: 60vw;
  margin-left: 40px;
  margin-right: 40px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  border: 5px solid ${(props) => props.theme.colors.primary};
  box-shadow: 20px 20px 4px 0px #00000040;
`;

const Titulo = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 80px;
  text-align: center;
`;

const Button = styled.button`
  padding: 8px 20px;
  border: none;
  background-color: ${(props) => props.theme.colors.primary};
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
  }
`;

const Grafico = () => {
  const [estoqueMinimo, setEstoqueMinimo] = useState("");
  const [data, setData] = useState([]);
  const [days, setDays] = useState(7);
  const [valorDiario, setValorDiario] = useState("");
  useEffect(() => {
    const carregarEstoque = async () => {
      try {
        const res = await apiAcai.get("/report/stock");
        setEstoqueMinimo(res.data.message[0].estoque);
        console.log(res.data.message[0].estoque);
      } catch (error) {
        console.log("Erro", error);
      }
    };
    carregarEstoque();
  }, []);

  const carregarVendas = async () => {
    try {
      const res = await apiAcai.get(`/report/sale?days=${days}`);
      console.log("data", res.data.message);

      const formattedData = res.data.message.map((item) => ({
        date: item.data,
        vendas: item.vendas,
      }));

      setData(formattedData);
    } catch (error) {
      console.log("Erro", error);
    }
  };

  useEffect(() => {
    carregarVendas();
  }, [days]);

  useEffect(() => {
    const carregarParametros = async () => {
      try {
        const res = await apiAcai.get("/report/vendas");
        console.log("Sucessaaao", res.data.vendas);
        setValorDiario(res.data.vendas);
      } catch (error) {
        console.log("Erro", error);
      }
    };
    carregarParametros();
  }, []);

  return (
    <>
      <ContainerBox>
        <Box tituloBox="Produtos com baixo estoque" numeroBox={estoqueMinimo} />
        <Box tituloBox="Vendas do dia" numeroBox={valorDiario} />
      </ContainerBox>

      <ContainerGrafico>
        <Titulo>Resumo de Vendas</Titulo>
        <Controls>
          <Input
            type="number"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            min="1"
            placeholder="Dias"
          />
          <Button onClick={carregarVendas}>Buscar</Button>
        </Controls>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" align="right" />
            <Bar
              dataKey="vendas"
              fill="rgba(108, 45, 78, 255)"
              label={{ position: "top" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </ContainerGrafico>
    </>
  );
};

export default Grafico;
