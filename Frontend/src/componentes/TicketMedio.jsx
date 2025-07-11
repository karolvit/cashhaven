import { useState, useEffect } from "react";
import apiAcai from "../axios/config";
import PropTypes from "prop-types";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TicketMedio = ({ dataInicial, dataFinal }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTicketMedio = async () => {
      if (!dataInicial || !dataFinal) return;

      try {
        const response = await apiAcai.get(
          `/report/ticket?data_inicial=${dataInicial}&data_final=${dataFinal}`
        );
        const ticketData = response.data.dados;

        console.log("Resposta da API:", ticketData);

        if (ticketData.length > 0) {
          const formattedData = ticketData.map((item) => ({
            dia: item.dia,
            ticket_medio: parseFloat(item.ticket_medio),
            vendas: item.vendas,
          }));

          setData(formattedData);
        }
      } catch (error) {
        console.error("Erro ao buscar Ticket Médio:", error);
      }
    };

    fetchTicketMedio();
  }, [dataInicial, dataFinal]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="dia" scale="band" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />

        <Bar
          yAxisId="left"
          dataKey="vendas"
          barSize={20}
          fill="rgba(108, 45, 78, 255)"
        />

        <Line
          yAxisId="right"
          type="monotone"
          dataKey="ticket_medio"
          stroke="#ff7300"
          strokeWidth={2}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

TicketMedio.propTypes = {
  dataInicial: PropTypes.string.isRequired,
  dataFinal: PropTypes.string.isRequired,
};

export default TicketMedio;
