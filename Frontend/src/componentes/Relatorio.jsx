import Modal from "react-modal";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Download, Close } from "@mui/icons-material";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import PropTypes from "prop-types";
import styled from "styled-components";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    maxHeight: "80%",
    overflow: "auto",
  },
};

const StyledTableCell = styled(TableCell)`
  padding: 10px;
  color: white !important;
  font-weight: bold;
`;

const StyledTabela = styled(TableRow)`
  padding: 10px;
  color: gray !important;
  font-weight: bold;
`;

const Relatorio = ({ isOpen, onClose, headers, data }) => {
  if (!headers || !Array.isArray(headers) || !data || !Array.isArray(data)) {
    return null; // Retorna null até que os dados e cabeçalhos estejam disponíveis
  }

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Relatório", 20, 10);
    doc.autoTable({
      head: [headers],
      body: data.map((row) => headers.map((col) => row[col] || "")),
    });
    doc.save("relatorio.pdf");
  };

  const exportExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Relatório");

    sheet.addRow(headers);
    data.forEach((row) => sheet.addRow(headers.map((col) => row[col] || "")));

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), "relatorio.xlsx");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      ariaHideApp={false}
    >
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <StyledTabela>
              {headers.map((header, index) => (
                <StyledTableCell key={index}>
                  {header.replace("_", " ").toUpperCase()}
                </StyledTableCell>
              ))}
            </StyledTabela>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {headers.map((col, colIndex) => (
                  <TableCell key={colIndex}>{row[col] || ""}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        style={{
          marginTop: 20,
          display: "flex",
          gap: 10,
          justifyContent: "center",
        }}
      >
        <Button
          startIcon={<Download />}
          onClick={exportPDF}
          variant="contained"
        >
          Baixar PDF
        </Button>
        <Button
          startIcon={<Download />}
          onClick={exportExcel}
          variant="contained"
          color="success"
        >
          Baixar Excel
        </Button>
      </div>
    </Modal>
  );
};

Relatorio.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Relatorio;
